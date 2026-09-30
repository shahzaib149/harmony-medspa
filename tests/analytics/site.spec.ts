import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
const fixture='/landing/analytics-regression-fixture';
const query='?gclid=TEST123&gbraid=TEST&wbraid=TEST&utm_source=google&utm_medium=cpc&utm_campaign=test&utm_custom=preserved';
const events=(page:Page)=>page.evaluate(()=> (window.dataLayer||[]).map(x=>Array.from(x as ArrayLike<unknown>)).filter(x=>x[0]==='event'));
const leads=async(page:Page)=>(await events(page)).filter(e=>['conversion','generate_lead'].includes(e[1] as string));
const pageViews=async(page:Page)=>(await events(page)).filter(e=>e[1]==='page_view');
test.beforeEach(async({page})=>{
  // Exercise our queue while keeping regression runs out of production GA/Ads/Make.
  await page.route(/googletagmanager.com|google-analytics.com|googleadservices.com|doubleclick.net/,r=>r.fulfill({body:'',contentType:'application/javascript'}));
  await page.route(/hook\..*make\.com/,r=>r.abort());
});
const landings=fs.readdirSync('app/landing',{withFileTypes:true}).filter(e=>e.isDirectory()&&fs.existsSync(`app/landing/${e.name}/page.tsx`)).map(e=>'/landing/'+e.name);
for(const route of ['/', '/medical-weight-loss','/blog/who-is-a-good-candidate-for-injectables','/landing','/landing-v1',...landings,'/nonexistent-analytics-route']){
 test('one tag and one clean initial view: '+route,async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(route+query);
  await expect(page.locator('head #google-gtag-init')).toHaveCount(1);
  await expect(page.locator('#google-gtag-loader')).toHaveCount(1);
  await expect.poll(async()=> (await pageViews(page)).length).toBe(1);
  const views=await pageViews(page); const p=views[0][2] as Record<string,string>;
  expect(p.send_to).toBe('G-TEST123');expect(p.page_location).toContain('gclid=TEST123');
  expect(p.page_title).toBe(await page.title());
  expect((p.page_title.match(/Harmony Med Spa/g)||[]).length).toBe(1);
  expect(errors).toEqual([]);
 });
}
test('SPA, query changes, back navigation and stored attribution into contact payload',async({page})=>{
 await page.goto(fixture+query);await expect(page.getByTestId('fixture-ready')).toHaveText('ready');await expect.poll(async()=> (await pageViews(page)).length).toBe(1);
 await page.getByRole('link',{name:'Service',exact:true}).click();await expect(page).toHaveURL(/\/medical-weight-loss$/);
 await expect.poll(async()=> (await pageViews(page)).length).toBe(2);
 expect((await pageViews(page)).at(-1)?.[2]).toMatchObject({page_title:await page.title()});
 await page.goBack();await expect.poll(async()=> (await pageViews(page)).length).toBe(3);
 await page.getByRole('link',{name:'Query change',exact:true}).click();await expect.poll(async()=> (await pageViews(page)).length).toBe(4);
 await page.getByRole('link',{name:'Form',exact:true}).click();await expect(page).toHaveURL(/\/contact-us$/);
 await expect.poll(async()=> (await pageViews(page)).length).toBe(5);
 const payloads:Record<string,string>[]=[];
 await page.route(/hook\..*make\.com/,async r=>{payloads.push(r.request().postDataJSON());await r.fulfill({status:200,body:'Accepted'});});
 const form=page.locator('form').first();
 await form.locator('[name=name]').fill('Analytics Test');await form.locator('[name=email]').fill('analytics@example.com');await form.locator('[name=phone]').fill('9415550123');
 await form.locator('button[type=submit]').click();await expect.poll(async()=> (await leads(page)).length).toBe(2);
 expect(payloads).toHaveLength(1);expect(payloads[0]).toMatchObject({GCLID:'TEST123',GBRAID:'TEST',WBRAID:'TEST','UTM Campaign':'test',utm_custom:'preserved'});
 expect((await leads(page)).map(e=>e[1])).toEqual(['conversion','generate_lead']);
});
for(const failure of ['validation','http','rejected']) test('zero conversions on '+failure,async({page})=>{
 await page.goto('/landing/medical-weight-loss'+query);
 const form=page.locator('form').first();
 if(failure!=='validation'){
  await form.locator('[name=name]').fill('Analytics Test');await form.locator('[name=email]').fill('analytics@example.com');await form.locator('[name=phone]').fill('9415550123');
 }
 if(failure==='http')await page.route(/hook\..*make\.com/,r=>r.fulfill({status:500,body:'Forced test failure'}));
 await form.locator('button[type=submit]').click();
 if(failure==='validation')await expect(form.getByText('Please enter your name.')).toBeVisible();
 else await expect(form.getByRole("alert")).toBeVisible();
 expect(await leads(page)).toEqual([]);
});
test('last paid click replaces campaign; expiry and storage denial are safe',async({page})=>{
 await page.goto(fixture+query);
 await page.goto(fixture+'?wbraid=NEW&utm_source=google&utm_campaign=second');
 let stored=await page.evaluate(()=>window.__harmonyTracking!.read());
 expect(stored).toEqual({wbraid:'NEW',utm_source:'google',utm_campaign:'second'});
 await page.goto(fixture+'?utm_source=organic');
 expect(await page.evaluate(()=>window.__harmonyTracking!.read())).toEqual(stored);
 await page.goto(fixture); // Expire on a URL without campaign parameters.
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 await page.evaluate(()=>{const key='harmony_attribution_v1';const item=JSON.parse(localStorage.getItem(key)!);item.expires=Date.now()-1;localStorage.setItem(key,JSON.stringify(item));});
 await page.goto(fixture);expect(await page.evaluate(()=>window.__harmonyTracking!.read())).toEqual({});
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage denied');}});});
 await page.goto(fixture+query);stored=await page.evaluate(()=>window.__harmonyTracking!.read());expect(stored.gclid).toBe('TEST123');
});

test('uppercase and trailing slash redirects preserve arbitrary attribution',async({request})=>{
 const response=await request.get('/LANDING/MEDICAL-WEIGHT-LOSS/'+query);
 expect(response.status()).toBe(200);
 expect(response.url()).toContain('/landing/medical-weight-loss?');
 for(const [name,value] of new URLSearchParams(query))expect(new URL(response.url()).searchParams.get(name)).toBe(value);
});

for(const kind of ['newsletter','specials','membership','pricing','weight-loss']) test(kind+' failure then success: payload and exactly one event pair',async({page})=>{
 await page.goto(kind==='weight-loss'?'/landing/medical-weight-loss'+query:fixture+query);
 if(kind!=='weight-loss')await expect(page.getByTestId('fixture-ready')).toHaveText('ready');
 const form=kind==='weight-loss'?page.locator('form').first():page.locator('#test-'+kind+' form');
 await form.locator('input[type=text]').filter({visible:true}).first().fill('Analytics Test');
 await form.locator('input[type=email]').fill('analytics@example.com');
 await form.locator('input[type=tel]').fill('9415550123');
 let fail=true;const payloads:Record<string,string>[]=[];
 await page.route(/hook\..*make\.com/,async r=>{payloads.push(r.request().postDataJSON());await r.fulfill({status:fail?500:200,body:fail?'Test failure':'Accepted'});});
 await form.locator('button[type=submit]').click();
 await expect.poll(()=>payloads.length).toBe(1);
 await expect(form.locator('button[type=submit]')).toBeEnabled();
 expect(await leads(page)).toEqual([]);
 fail=false;await form.locator('button[type=submit]').click();
 await expect.poll(async()=> (await leads(page)).length).toBe(2);
 expect(payloads).toHaveLength(2);
 expect(payloads[1]).toMatchObject({GCLID:'TEST123',GBRAID:'TEST',WBRAID:'TEST',utm_custom:'preserved'});
});

test('first external referrer survives internal page loads and is sent once as referrerSource',async({page})=>{
 await page.goto('/services',{referer:'https://chatgpt.com/'});
 await page.goto('/landing/medical-weight-loss',{referer:'http://localhost:3101/services'});
 const payloads:Record<string,string>[]=[];
 await page.route(/hook\..*make\.com/,async r=>{payloads.push(r.request().postDataJSON());await r.fulfill({status:200,body:'Accepted'});});
 const form=page.locator('form').first();
 await form.locator('[name=name]').fill('Analytics Test');await form.locator('[name=email]').fill('analytics@example.com');await form.locator('[name=phone]').fill('9415550123');
 await form.locator('button[type=submit]').click();
 await expect.poll(async()=> (await leads(page)).length).toBe(2);
 expect(payloads).toHaveLength(1);
 expect(payloads[0].referrerSource).toMatch(/^https:\/\/chatgpt\.com\//);
 expect((await leads(page)).map(e=>e[1])).toEqual(['conversion','generate_lead']);
});

test('a visit with no external referrer sends referrerSource "direct"',async({page})=>{
 await page.goto('/landing/medical-weight-loss');
 const payloads:Record<string,string>[]=[];
 await page.route(/hook\..*make\.com/,async r=>{payloads.push(r.request().postDataJSON());await r.fulfill({status:200,body:'Accepted'});});
 const form=page.locator('form').first();
 await form.locator('[name=name]').fill('Analytics Test');await form.locator('[name=email]').fill('analytics@example.com');await form.locator('[name=phone]').fill('9415550123');
 await form.locator('button[type=submit]').click();
 await expect.poll(()=>payloads.length).toBe(1);
 expect(payloads[0].referrerSource).toBe('direct');
});

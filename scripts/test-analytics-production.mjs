import fs from 'node:fs';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','3102'],{stdio:'ignore',windowsHide:true});
let browser;

(async()=>{
for(let i=0;i<100;i++) {
 try { await fetch('http://localhost:3102'); break; } catch { if(i===99) throw new Error('Production server did not start'); await new Promise(r=>setTimeout(r,100)); }
}
const caseQuery='?gclid=TEST123&gbraid=TEST&wbraid=TEST&utm_source=google&utm_medium=cpc&utm_campaign=test';
const caseResponse=await fetch('http://localhost:3102/Landing/Medical-Weight-Loss'+caseQuery,{redirect:'manual'});
assert.equal(caseResponse.status,308);
const caseLocation=new URL(caseResponse.headers.get('location'),'http://localhost:3102');
assert.equal(caseLocation.pathname,'/landing/medical-weight-loss');
assert.equal(caseLocation.search,caseQuery);
assert.equal((await fetch(caseLocation)).status,200);
const caseRedirect={status:caseResponse.status,location:caseLocation.href};
console.log('PASS mixed-case redirect preserves every attribution parameter');
browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
const landings=fs.readdirSync('app/landing',{withFileTypes:true}).filter(e=>e.isDirectory()&&fs.existsSync('app/landing/'+e.name+'/page.tsx')).map(e=>'/landing/'+e.name);
for(const path of ['/','/medical-weight-loss','/blog/who-is-a-good-candidate-for-injectables','/landing','/landing-v1',...landings,'/nonexistent-analytics-route']){
 const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/googletagmanager.com|google-analytics.com|googleadservices.com|doubleclick.net/,r=>r.fulfill({status:200,body:'',contentType:'application/javascript'}));
 await page.goto('http://localhost:3102'+path+'?gclid=TEST123&utm_source=google');await page.waitForTimeout(1000);
 const result=await page.evaluate(()=>({title:document.title,bootstrap:document.querySelectorAll('head #google-gtag-init').length,loader:document.querySelectorAll('#google-gtag-loader').length,events:(window.dataLayer||[]).map(x=>Array.from(x)).filter(x=>x[0]==='event'),attribution:window.__harmonyTracking?.read()}));
 assert.equal(result.bootstrap,1);assert.equal(result.loader,1);assert.equal(result.events.length,1);assert.equal(result.events[0][1],'page_view');assert.equal(result.events[0][2].page_title,result.title);assert.equal(result.attribution.gclid,'TEST123');assert.deepEqual(errors,[]);
 results.push({path,...result});await context.close();console.log('PASS production bundle',path);
}
const p=await browser.newPage();await p.route(/\/_next\/static\/.*\.js/,r=>r.abort());await p.route(/googletagmanager.com|google-analytics.com|googleadservices.com|doubleclick.net/,r=>r.fulfill({body:'',contentType:'application/javascript'}));
await p.goto('http://localhost:3102/?gclid=BEFORE_HYDRATION');
const early=await p.evaluate(()=>({events:(window.dataLayer||[]).map(x=>Array.from(x)).filter(x=>x[1]==='page_view'),gclid:window.__harmonyTracking?.read().gclid}));assert.equal(early.events.length,1);assert.equal(early.gclid,'BEFORE_HYDRATION');
fs.mkdirSync('audit',{recursive:true});fs.writeFileSync('audit/local-production-verification.json',JSON.stringify({routes:results,blockedNextJavaScript:early,caseRedirect},null,2));console.log('PASS initial page view and attribution with ALL Next JavaScript blocked');
await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();server.kill();});

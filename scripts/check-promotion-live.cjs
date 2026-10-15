/* eslint-disable @typescript-eslint/no-require-imports -- Standalone read-only verification. */
const assert = require('node:assert/strict');
const origin = process.argv[2] || 'http://localhost:3107';
const slug = 'national-esthetician-day-flash-sale-sarasota-2026';
const stripScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
(async () => {
  const specials = await fetch(origin + '/specials', { redirect: 'manual' });
  assert.equal(specials.status, 307);
  assert.equal(specials.headers.get('location'), 'https://mailchi.mp/harmonymedspafl/monthly-specials');
  console.log('PASS /specials: original Mailchimp redirect restored');
  for (const path of ['/', '/blog', `/blog/${slug}`, '/robots.txt', '/sitemap.xml']) {
    const response = await fetch(origin + path, { signal: AbortSignal.timeout(60000) });
    assert.equal(response.status, 200, path);
    assert.equal(new URL(response.url).pathname, path, `${path} unexpectedly redirects`);
    const raw = await response.text();
    const html = stripScripts(raw);
    if (path === '/sitemap.xml') {
      assert.ok(raw.includes(`/blog/${slug}`), 'Campaign absent from sitemap');
      assert.ok(!raw.includes('/specials</loc>'), 'Redirect must not appear in sitemap');
      const urls = [...raw.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
      assert.equal(urls.length, new Set(urls).size);
      assert.ok(urls.every(url => new URL(url).origin === 'https://www.harmonymedspafl.com'));
    } else if (path === `/blog/${slug}`) {
      assert.ok(html.includes('2,100'));
      assert.ok(html.includes('href="/specials"'));
      assert.ok(html.includes(`href="https://www.harmonymedspafl.com/blog/${slug}"`));
      assert.ok(!/name="robots"[^>]*noindex/.test(html));
    }
    if (['/', '/blog'].includes(path) && Date.now() >= Date.parse('2026-10-15T04:00:00Z') && Date.now() < Date.parse('2026-10-17T04:00:00Z')) {
      assert.ok(html.includes('View offers and terms'), 'Active banner absent from initial HTML');
      for (const price of ['2,100', '1,890', '1,785', '4,000', '3,600', '3,400']) {
        assert.ok(html.includes(price), `Active promotion price ${price} absent from ${path}`);
      }
    }
    console.log(`PASS ${path}: HTTP 200, expected initial response content`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

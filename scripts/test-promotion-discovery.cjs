/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node test harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, imports = {}, globals = {}) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(js, { exports, require: name => {
    if (!(name in imports)) throw Error(`Unexpected import: ${name}`);
    return imports[name];
  }, console, URLSearchParams, Date, Response, setTimeout, ...globals }, { filename: file });
  return exports;
}

(async () => {
  const { promotionStatus } = load('lib/promotions.ts');
  for (const [date, expected] of [
    ['2026-10-15T03:59:59Z', 'upcoming'],
    ['2026-10-15T04:00:00Z', 'active'],
    ['2026-10-17T03:59:59Z', 'active'],
    ['2026-10-17T04:00:00Z', 'ended'],
    ['2027-01-01T00:00:00Z', 'ended'],
  ]) assert.equal(promotionStatus(new Date(date)), expected);

  const record = (slug, status = 'Published', date = '2026-01-01') => ({
    id: slug, createdTime: date, fields: { Title: slug, Slug: slug, Status: status, 'Published At': date, 'CMS Data': '{}' },
  });
  const calls = [];
  const airtable = load('lib/blogs/airtable.ts', {
    '@/lib/text/headingCase': { titleCaseIfLowercase: x => x },
  }, { process: { env: { AIRTABLE_API_KEY: 'test-only', AIRTABLE_BLOGS_BASE_ID: 'test-base' } }, fetch: async (url) => {
    calls.push(url);
    return { ok: true, json: async () => calls.length === 1
      ? { records: [record('published'), record('draft', 'Draft'), record('scheduled', 'Published', '2099-01-01')], offset: 'page2' }
      : { records: [record('second-page')] } };
  } });
  const published = await airtable.listPublishedBlogs();
  assert.equal(published.map(x => x.slug).join(','), 'published,second-page');
  assert.equal(calls.length, 2);
  assert.ok(calls[1].includes('offset=page2'));
  assert.ok(decodeURIComponent(calls[0]).includes("{Status}='Published'"));

  const sitemap = load('app/sitemap.ts', {
    '@/lib/blogs/archive': { listArchivedLegacyBlogs: () => [{ slug: 'published', updatedAt: '2025-01-01' }, { slug: 'redirected' }] },
    '@/lib/blogs/airtable': { listPublishedBlogs: async () => published },
    '@/lib/blogs/redirects': { REDIRECTED_BLOG_SLUGS: ['redirected'] },
    '@/lib/seo/routes': { INDEXABLE_ROUTES: [{ path: '/specials', lastModified: '2026-10-15' }] },
    '@/lib/site-url': { siteUrl: () => 'https://www.harmonymedspafl.com' },
  });
  const entries = await sitemap.default();
  assert.equal(sitemap.revalidate, 300);
  assert.equal(entries.length, 3);
  assert.equal(new Set(entries.map(x => x.url)).size, entries.length);
  assert.ok(entries.some(x => x.url.endsWith('/specials')));
  assert.ok(!entries.some(x => /draft|scheduled|redirected/.test(x.url)));

  const invalidations = [];
  const webhook = load('app/api/blogs/revalidate/route.ts', {
    'next/cache': { revalidateTag: (...args) => invalidations.push(['tag', ...args]), revalidatePath: p => invalidations.push(['path', p]) },
    '@/lib/blogs/airtable': { BLOG_CACHE_TAG: 'published-blogs' },
  }, { process: { env: { BLOG_REVALIDATE_SECRET: 'test-only' } } });
  const request = (token, slug = 'new-slug') => new Request('http://localhost/api/blogs/revalidate', {
    method: 'POST', headers: { 'x-blog-revalidate-secret': token }, body: JSON.stringify({ slug, previousSlug: 'old-slug' }),
  });
  assert.equal((await webhook.POST(request('wrong'))).status, 401);
  assert.equal((await webhook.POST(request('test-only', '../bad'))).status, 400);
  assert.equal(invalidations.length, 0);
  assert.equal((await webhook.POST(request('test-only'))).status, 200);
  assert.ok(invalidations.some(x => x[0] === 'tag' && x[2].expire === 0));
  for (const p of ['/sitemap.xml', '/blog', '/blog/new-slug', '/blog/old-slug']) {
    assert.ok(invalidations.some(x => x[0] === 'path' && x[1] === p));
  }
  console.log('PASS: Sarasota sale boundaries; published-only pagination; sitemap deduplication; authenticated immediate cache invalidation and slug changes.');
})().catch(error => { console.error(error); process.exitCode = 1; });

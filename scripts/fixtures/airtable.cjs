// Loaded via NODE_OPTIONS in CI only. Production application code never imports this.
if (process.env.HARMONY_ANALYTICS_FIXTURE === '1') {
  if (process.env.AIRTABLE_API_KEY !== 'test-only' || process.env.AIRTABLE_BLOGS_BASE_ID !== 'test-base') {
    throw new Error('CMS fixture requires isolated test-only credentials.');
  }
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async function fixtureFetch(input, init) {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
    if (url.hostname !== 'api.airtable.com') return originalFetch(input, init);
    if (!url.pathname.startsWith('/v0/test-base/')) throw new Error('Unexpected CMS base in regression test');
    return Response.json({ records: [{
      id: 'recAnalyticsFixture', createdTime: '2026-01-01T00:00:00Z',
      fields: {
        Title: 'Analytics regression fixture article', Slug: 'analytics-regression-fixture-article',
        Status: 'Published', 'Published At': '2026-01-01T00:00:00Z',
        'Updated At': '2026-01-01T00:00:00Z',
        'CMS Data': JSON.stringify({ excerpt: 'Test-only article, never written to the CRM.', content: [
          { id: 'fixture-paragraph', type: 'paragraph', text: 'Isolated content for automated regression tests.' },
        ] }),
      },
    }] });
  };
}

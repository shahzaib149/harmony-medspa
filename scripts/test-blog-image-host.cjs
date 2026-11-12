/* eslint-disable @typescript-eslint/no-require-imports -- Standalone config regression test. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { hasRemoteMatch } = require('next/dist/shared/lib/match-remote-pattern');
const result = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('next.config.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports: result.exports, process: { env: {}, cwd: () => process.cwd() } });
const patterns = result.exports.default.images.remotePatterns;
const url = 'https://jwbngsdmdwaagpksyxxn.supabase.co/storage/v1/object/public/Blog%20Images/harmony-pills-vs-injections-blog-1000x563.jpg';
assert.ok(hasRemoteMatch([], patterns, new URL(url)), 'New blog image host must be allowed');
assert.ok(hasRemoteMatch([], patterns, new URL('https://fcpqllxxplkmrbxayeuo.supabase.co/storage/v1/object/public/blog-images/existing.jpg')));
assert.equal(hasRemoteMatch([], patterns, new URL(url.replace('https:', 'http:'))), false);
assert.equal(hasRemoteMatch([], patterns, new URL(url.replace('jwbngsdmdwaagpksyxxn', 'untrusted-project'))), false);
assert.equal(hasRemoteMatch([], patterns, new URL(url.replace('/public/', '/private/'))), false);
console.log('PASS: both blog hosts allowed; HTTP, unrelated hosts and private paths blocked.');

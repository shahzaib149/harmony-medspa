import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

const js = ts.transpileModule(fs.readFileSync('lib/home-offers.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const sandbox = { exports: {}, Intl, Date };
vm.runInNewContext(js, sandbox);
const { homeOffers, activeHomeOffers, clinicDate } = sandbox.exports;
const approved = homeOffers.map(offer => ({ ...offer, approved: true }));
assert.equal(activeHomeOffers(homeOffers, new Date('2026-09-28T12:00:00Z')).length, 0);
assert.equal(activeHomeOffers(approved, new Date('2026-09-01T03:59:59Z')).length, 0);
assert.equal(activeHomeOffers(approved, new Date('2026-09-01T04:00:00Z')).length, 2);
assert.equal(activeHomeOffers(approved, new Date('2026-10-01T03:59:59Z')).length, 2);
assert.equal(activeHomeOffers(approved, new Date('2026-10-01T04:00:00Z')).length, 0);
assert.equal(clinicDate(new Date('2026-12-01T04:59:59Z')), '2026-11-30');
assert.equal(clinicDate(new Date('2026-12-01T05:00:00Z')), '2026-12-01');
assert.equal(activeHomeOffers([], new Date()).length, 0);
console.log('Offers: approval gate, start/end boundaries, Eastern daylight/standard time and empty configuration passed.');

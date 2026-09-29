import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const unit = spawnSync(process.execPath, ['scripts/test-analytics-unit.mjs'], { stdio: 'inherit' });
if (unit.status !== 0) process.exit(unit.status ?? 1);
const fixture = path.resolve('app/landing/analytics-regression-fixture');
if(fs.existsSync(fixture)) throw new Error('Refusing to overwrite an existing fixture route');
fs.mkdirSync(fixture);
try {
  fs.writeFileSync(path.join(fixture,'Ready.tsx'), '"use client";\nimport { useEffect, useRef } from "react";\nexport default function Ready(){const ref=useRef<HTMLSpanElement>(null);useEffect(()=>{if(ref.current)ref.current.textContent="ready";},[]);return <span hidden ref={ref} data-testid="fixture-ready">waiting</span>;}');
  fs.writeFileSync(path.join(fixture,'page.tsx'), `import Link from 'next/link';
import Ready from './Ready';
import NewsletterForm from '@/components/forms/NewsletterForm';
import SpecialsForm from '@/components/forms/SpecialsForm';
import MembershipForm from '@/components/forms/MembershipForm';
export const metadata = { title: 'Analytics Regression Fixture' };
export default function Page() { return <main><Ready /><h1>Temporary analytics fixture</h1><Link href='/medical-weight-loss'>Service</Link><Link href='/contact-us'>Form</Link><Link href='/landing/analytics-regression-fixture?step=2'>Query change</Link><section id="test-newsletter"><NewsletterForm /></section><section id="test-specials"><SpecialsForm /></section><section id="test-membership"><MembershipForm kind="membership" /></section><section id="test-pricing"><MembershipForm kind="pricing" /></section></main>; }
`);
  const result=spawnSync(process.execPath,['node_modules/@playwright/test/cli.js','test'],{stdio:'inherit'});
  process.exitCode=result.status??1;
} finally {
  // Only remove the exact file and directory this runner created.
  fs.unlinkSync(path.join(fixture,'page.tsx'));
  fs.unlinkSync(path.join(fixture,'Ready.tsx'));
  fs.rmdirSync(fixture);
  // Next caches type references to the temporary route. Remove only generated
  // test-server types, then regenerate the real route types for tsc/CI.
  const generated = path.resolve(".next/dev/types");
  const workspace = path.resolve(".") + path.sep;
  if (!generated.startsWith(workspace)) throw new Error("Generated types escaped workspace");
  fs.rmSync(generated, { recursive: true, force: true });
  const typegen = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "typegen"], { stdio: "inherit" });
  if (typegen.status !== 0) process.exitCode = typegen.status ?? 1;
}

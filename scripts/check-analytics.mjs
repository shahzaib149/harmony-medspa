import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d,e.name)) : [path.join(d,e.name).replaceAll('\\','/')]);
const files = ['app','components','lib','public'].flatMap(walk);
const errors = [];
for (const file of files.filter(f => /\.(tsx?|jsx?|html?)$/.test(f))) {
  const text = fs.readFileSync(file,'utf8');
  if(!['lib/analytics.ts','lib/submitLead.ts'].includes(file) && /\bconfirmLeadResponse\b/.test(text)) errors.push(file+': only the lead transport may mint a successful response');
  if(file !== 'lib/analytics.ts' && /\bgtag\s*!?\s*(?:\?\.)?\s*\(|\bdataLayer\s*!?\s*(?:\?\.)?\.\s*push\s*\(/.test(text)) errors.push(file+': direct Google event call outside helper');
  if(file !== 'lib/analytics.ts' && /googletagmanager\.com\/(gtag|gtm)/.test(text)) errors.push(file+': duplicate Google loader');
  if(file.startsWith('public/') && /\.html?$/.test(file)) errors.push(file+': static HTML bypasses the shared layout; migrate to app/');
  if(file.startsWith('app/') && file !== 'app/layout.tsx' && /<html\b|<body\b/.test(text)) errors.push(file+': independent document needs explicit analytics review');
  if(file.startsWith('app/')) {
    const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    const visit=node=>{
      if(ts.isPropertyAssignment(node) && node.name.getText(ast)==='template' && file !== 'app/layout.tsx')errors.push(file+': title templates belong only in the root');
      if(ts.isVariableDeclaration(node) && node.name.getText(ast)==='metadata' && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
        const title=node.initializer.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(ast)==='title');
        if(file.endsWith('/page.tsx') && !title) errors.push(file+': page metadata requires a title');
        if(title && ts.isPropertyAssignment(title) && ts.isStringLiteral(title.initializer) && /\|\s*Harmony Med Spa/i.test(title.initializer.text))errors.push(file+': page title repeats root brand suffix');
      }
      ts.forEachChild(node,visit);
    };visit(ast);
    if(file.endsWith('/page.tsx') && file !== 'app/page.tsx' && !/export (const metadata|async function generateMetadata)/.test(text)) errors.push(file+': declare metadata for a stable page title');
  }
}
const root=fs.readFileSync('app/layout.tsx','utf8');
if((root.match(/<GoogleAnalytics\s*\/>/g)||[]).length!==1) errors.push('Root must render exactly one shared tag component');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('Analytics ownership, layout coverage and metadata checks passed.');

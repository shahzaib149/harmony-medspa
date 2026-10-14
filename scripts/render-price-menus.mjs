// Renders the 2026 price menu (2 pages) and the Clinical IV Therapy menu as 1275x1650 JPGs
// into public/images/pricing/ from lib/data/pricing.ts, so the graphics always match the
// prices published on the site. These stand in for the clinic's own designed menus; when the
// clinic supplies those, save them over the same files and stop re-running this script.
// Rerun after any price change: node scripts/render-price-menus.mjs (needs Google Chrome).
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const { chromium } = require("playwright");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/images/pricing");

function loadTs(file) {
  const source = fs.readFileSync(file, "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const m = new Module(file);
  m.filename = file;
  m._compile(outputText, file);
  return m.exports;
}

const pricing = loadTs(path.join(root, "lib/data/pricing.ts"));
const constants = loadTs(path.join(root, "lib/constants.ts"));
const logo = "data:image/png;base64," + fs.readFileSync(path.join(root, "public/images/logo-transparent.png")).toString("base64");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cat = (id) => pricing.PRICING_CATEGORIES.find((c) => c.id === id);

function categoryHtml(id, kicker) {
  const c = cat(id);
  // Figures the clinic flagged for confirmation are never published.
  const items = c.items.filter((i) => !i.needsConfirmation);
  return `
    <section class="cat">
      <p class="kicker">${esc(kicker)}</p>
      <h2>${esc(c.title)}</h2>
      <ul>
        ${items
          .map(
            (i) => `<li><span class="name">${esc(i.name)}${i.note ? `<em>${esc(i.note)}</em>` : ""}</span><span class="dots"></span><span class="price">${esc(i.price)}</span></li>`
          )
          .join("")}
      </ul>
      ${c.footnote && c.footnote !== c.blurb ? `<p class="foot">${esc(c.footnote)}</p>` : ""}
    </section>`;
}

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1275px; height: 1650px; }
  body { background: #faf6ee; color: #2c2620; font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; display: flex; flex-direction: column; }
  header { background: radial-gradient(circle at 25% 0%, #2c2418, transparent 60%), linear-gradient(160deg, #1b1711, #0d0b08); color: #f6efe1; text-align: center; padding: 54px 60px 46px; position: relative; }
  header::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: linear-gradient(90deg, transparent, #e7c46a, transparent); }
  header img { width: 300px; height: auto; display: block; margin: 0 auto 22px; }
  header h1 { font-family: Georgia, "Times New Roman", serif; font-weight: 400; font-size: 44px; letter-spacing: 0.02em; }
  header p { margin-top: 10px; color: #d9b977; font-size: 17px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; }
  main { flex: 1; padding: 56px 84px 30px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 64px; }
  .cat { margin-bottom: 40px; break-inside: avoid; }
  .kicker { color: #9a7530; font-size: 14px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; }
  .cat h2 { font-family: Georgia, "Times New Roman", serif; font-weight: 400; font-size: 32px; color: #16130f; margin: 6px 0 14px; padding-bottom: 12px; border-bottom: 1px solid #dcc79a; }
  .cat ul { list-style: none; }
  .cat li { display: flex; align-items: baseline; gap: 12px; padding: 9px 0; font-size: 22px; }
  .name { display: flex; flex-direction: column; }
  .name em { font-style: italic; font-size: 16px; color: #7a6f5d; margin-top: 2px; }
  .dots { flex: 1; border-bottom: 2px dotted #cdb98f; transform: translateY(-6px); min-width: 30px; }
  .price { font-family: Georgia, "Times New Roman", serif; font-size: 24px; color: #8a6716; font-weight: 700; white-space: nowrap; }
  .foot { margin-top: 8px; font-size: 16px; font-style: italic; color: #6b6151; }
  .tight .cat { margin-bottom: 26px; }
  .tight .cat h2 { margin-bottom: 8px; padding-bottom: 10px; }
  .tight .cat li { padding: 6px 0; }
  .compact .cat { margin-bottom: 30px; }
  .compact .cat h2 { font-size: 28px; margin-bottom: 10px; padding-bottom: 10px; }
  .compact .cat li { font-size: 20px; padding: 7px 0; }
  .compact .price { font-size: 21px; }
  .iv { display: grid; gap: 26px; }
  .infusion { background: #fff; border: 1px solid #e6d9bd; border-radius: 22px; padding: 30px 36px; box-shadow: 0 12px 30px rgba(60,45,20,0.06); }
  .infusion .top { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; }
  .infusion h2 { font-family: Georgia, "Times New Roman", serif; font-weight: 400; font-size: 34px; color: #16130f; }
  .infusion .price { font-size: 32px; }
  .infusion .summary { margin-top: 4px; font-size: 20px; color: #514a40; }
  .infusion .delivery { margin-top: 2px; font-size: 16px; color: #7a6f5d; font-style: italic; }
  .infusion ul { list-style: none; margin-top: 16px; display: grid; gap: 9px; }
  .infusion li { display: grid; grid-template-columns: 14px 1fr; gap: 12px; font-size: 18px; line-height: 1.4; }
  .infusion li::before { content: ""; width: 9px; height: 9px; border-radius: 50%; background: #c99b13; margin-top: 8px; }
  .infusion li strong { color: #16130f; font-weight: 600; }
  .infusion .addon { margin-top: 14px; font-size: 16px; color: #8a6716; font-weight: 600; }
  footer { padding: 0 84px 46px; text-align: center; }
  footer .note { font-size: 15px; line-height: 1.55; color: #6f6757; max-width: 1000px; margin: 0 auto 18px; }
  footer .contact { border-top: 1px solid #dcc79a; padding-top: 18px; font-size: 17px; color: #2c2620; letter-spacing: 0.04em; }
  footer .contact b { color: #8a6716; }
`;

function page({ title, subtitle, body, note }) {
  const contact = `${constants.SITE_NAME} · ${constants.ADDRESS_LINE_1}, ${constants.ADDRESS_LINE_2} · <b>${constants.PHONE_DISPLAY}</b> · harmonymedspafl.com`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
    <header><img src="${logo}" alt=""><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></header>
    <main>${body}</main>
    <footer><p class="note">${esc(note)}</p><p class="contact">${contact}</p></footer>
  </body></html>`;
}

const pages = [
  {
    file: "harmony-price-menu-2026-page-1.jpg",
    html: page({
      title: "2026 Price Menu",
      subtitle: "Aesthetics · Weight Loss · Hormones",
      body: `<div class="tight">${categoryHtml("injectables", "Aesthetics") + categoryHtml("medical-weight-loss", "Wellness") + categoryHtml("hormone-optimization", "Wellness")}</div>`,
      note: pricing.PRICING_GENERAL_DISCLAIMER,
    }),
  },
  {
    file: "harmony-price-menu-2026-page-2.jpg",
    html: page({
      title: "2026 Price Menu",
      subtitle: "Skin · Facials · Memberships",
      body: `<div class="cols compact"><div>${
        categoryHtml("rf-microneedling", "Skin resurfacing") +
        categoryHtml("fractional-co2-laser", "Skin resurfacing") +
        categoryHtml("rf-microneedling-co2-combination", "Skin resurfacing") +
        categoryHtml("facial-enhancements", "Add-ons")
      }</div><div>${
        categoryHtml("facials", "Skin care") +
        categoryHtml("facial-memberships", "Memberships") +
        categoryHtml("glo2facial-memberships", "Memberships") +
        categoryHtml("vip-beauty-bank-memberships", "Memberships")
      }</div></div>`,
      note: `${pricing.PRICING_GENERAL_DISCLAIMER} Full membership benefits are listed at harmonymedspafl.com/membership.`,
    }),
  },
  {
    file: "harmony-iv-therapy-menu-2026.jpg",
    html: page({
      title: "Clinical IV Therapy Menu",
      subtitle: "IV nutrient infusions · 2026",
      body: `<div class="iv">${pricing.IV_INFUSIONS.map(
        (iv) => `<article class="infusion">
          <div class="top"><h2>${esc(iv.name)}</h2><span class="price">${esc(iv.price)}</span></div>
          <p class="summary">${esc(iv.summary)}</p>
          <p class="delivery">${esc(iv.delivery)}</p>
          <ul>${iv.ingredients.map((ing) => `<li><span><strong>${esc(ing.name)}:</strong> ${esc(ing.benefit)}</span></li>`).join("")}</ul>
          ${iv.addOn ? `<p class="addon">${esc(iv.addOn)}</p>` : ""}
        </article>`
      ).join("")}</div>`,
      note: pricing.IV_CLINICAL_DISCLAIMER,
    }),
  },
];

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  const ctx = await browser.newContext({ viewport: { width: 1275, height: 1650 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  for (const { file, html } of pages) {
    await p.setContent(html, { waitUntil: "load" });
    const overflow = await p.evaluate(() => document.body.scrollHeight - 1650);
    await p.screenshot({ path: path.join(outDir, file), type: "jpeg", quality: 90 });
    console.log(file, overflow > 0 ? `OVERFLOWS by ${overflow}px` : "fits");
  }
  await browser.close();
})();

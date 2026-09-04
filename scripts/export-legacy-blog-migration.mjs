import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dashboardRoot = path.resolve(repoRoot, "..", "harmony-medspa-dashboard");
const routeRoot = path.join(repoRoot, "app", "blog");
const backupRoot = path.join(dashboardRoot, "work", "legacy-blog-backup-2026-09-04");
const archivePath = path.join(repoRoot, "content", "legacy-blog-archive.json");
const draftPath = path.join(dashboardRoot, "content", "legacy-seo-drafts.json");
const siteOrigin = "https://www.harmonymedspafl.com";
const bookingUrl = "https://na02.patientnow.com/a/HARMONYMEDSPA/OnlineBooking.aspx";

const profiles = [1, 2, 3].flatMap((part) =>
  JSON.parse(
    fs.readFileSync(
      path.join(import.meta.dirname, `legacy-migration-profiles-${part}.json`),
      "utf8",
    ),
  ),
);

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function decode(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function textFromJsx(value) {
  return decode(
    value
      .replace(/\{\s*["'`](.*?)["'`]\s*\}/gs, "$1")
      .replace(/<TypewriterText\b[^>]*\btext=["']([^"']+)["'][^>]*\/?\s*>/gis, "$1")
      .replace(/<br\s*\/?\s*>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function attr(tag, name) {
  const stringMatch = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "i"));
  if (stringMatch) return decode(stringMatch[1]);
  const jsxMatch = tag.match(new RegExp(`\\b${name}\\s*=\\s*\\{\\s*["']([^"']+)["']\\s*\\}`, "i"));
  return jsxMatch ? decode(jsxMatch[1]) : "";
}

function findRouteDirectory(slug) {
  const directory = fs
    .readdirSync(routeRoot, { withFileTypes: true })
    .find((entry) => entry.isDirectory() && entry.name.toLowerCase() === slug.toLowerCase());
  if (!directory) throw new Error(`Missing legacy route directory for ${slug}`);
  return path.join(routeRoot, directory.name);
}

function parseLegacySource(source, profile) {
  const article = source.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? source;
  const h1 = source.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
  const oldTitle = textFromJsx(h1) || profile.title;
  const images = [...article.matchAll(/<Image\b[\s\S]*?\/>/gi)].map((match) => ({
    url: attr(match[0], "src"),
    alt: attr(match[0], "alt") || `Editorial image for ${oldTitle}`,
  })).filter((image) => image.url);
  const blocks = [];
  let sequence = 0;
  for (const match of article.matchAll(/<(h2|h3|p|li|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const text = textFromJsx(match[2]);
    if (!text || text.length < 2) continue;
    const tag = match[1].toLowerCase();
    const type = tag === "h2" ? "heading2" : tag === "h3" ? "heading3" : "paragraph";
    blocks.push({ id: `${profile.slug}-legacy-${++sequence}`, type, text });
  }
  if (!blocks.length) throw new Error(`No readable article content found for ${profile.slug}`);
  return { oldTitle, images, blocks };
}

function relatedUrls(profile) {
  return profiles
    .filter((candidate) => candidate.category === profile.category && candidate.slug !== profile.slug)
    .slice(0, 3)
    .map((candidate) => `${siteOrigin}/blog/${candidate.slug}`);
}

function draftContent(profile, parsed) {
  const prefix = profile.slug;
  const feature = parsed.images[0];
  const originalBlocks = parsed.blocks.filter((block, index, blocks) => {
    if (index === 0 && block.type === "paragraph" && block.text === profile.summary) return false;
    if (block.type.startsWith("heading") && blocks[index - 1]?.text === block.text) return false;
    return true;
  });
  const items = [];
  if (feature) {
    items.push({
      id: `${prefix}-hero`,
      type: "image",
      url: feature.url.startsWith("/") ? `${siteOrigin}${feature.url}` : feature.url,
      alt: feature.alt,
      caption: `Treatment planning should connect a specific concern with realistic benefits, recovery, and safety.`
    });
  }
  items.push(
    { id: `${prefix}-intro`, type: "paragraph", text: profile.summary },
    { id: `${prefix}-decision-heading`, type: "heading2", text: "What this article helps you decide" },
    { id: `${prefix}-decision`, type: "paragraph", text: `${profile.candidate} ${profile.timing}` },
    ...originalBlocks,
    { id: `${prefix}-timing-heading`, type: "heading2", text: "What results and timing can realistically look like" },
    { id: `${prefix}-timing`, type: "paragraph", text: `${profile.timing} Individual response varies with anatomy, baseline health, the exact product or device, treatment settings, and follow-through. A useful plan defines when the first check-in occurs, what counts as expected progress, and when the plan should change.` },
    { id: `${prefix}-limits-heading`, type: "heading2", text: "Safety, limits, and reasons to pause" },
    { id: `${prefix}-limits`, type: "paragraph", text: `${profile.limits} Share allergies, current medicines and supplements, pregnancy or breastfeeding status, prior reactions, active infections, and important medical diagnoses before treatment. Seek prompt clinical advice for a reaction that is severe, worsening, or different from the recovery described by your treating professional.` },
    { id: `${prefix}-questions-heading`, type: "heading2", text: "Questions to take to your consultation" },
    { id: `${prefix}-questions`, type: "paragraph", text: `Ask what diagnosis or specific concern the plan addresses; why this option is preferred over reasonable alternatives; who performs the treatment; which side effects are common versus urgent; how much downtime and maintenance to expect; and the complete likely cost. Request product or device names when relevant. A trustworthy consultation should also explain when no treatment, a different treatment, or medical evaluation elsewhere is the safer answer.` },
    { id: `${prefix}-local-heading`, type: "heading2", text: "Planning care in Sarasota" },
    { id: `${prefix}-local`, type: "paragraph", text: `Sarasota's year-round ultraviolet exposure matters for treatments that temporarily increase sensitivity or carry pigment risk. Tell the clinic about recent tanning, outdoor work, travel, and event dates. Practical aftercare must fit real life: daily broad-spectrum sunscreen, shade, gentle products, hydration or nutrition guidance when relevant, and a clear way to contact the treating team if recovery changes.` },
    { id: `${prefix}-closing`, type: "paragraph", text: `The best next step is an individualized consultation, not choosing from a headline alone. Bring your priorities, timeline, medical history, current routine, and budget. Harmony Med Spa can then explain whether the option discussed here fits your goals and what a measured treatment plan would involve.` },
    {
      id: `${prefix}-faq`,
      type: "faq",
      items: [
        { id: `${prefix}-faq-1`, question: `What is the main purpose of this treatment or plan?`, answer: profile.summary },
        { id: `${prefix}-faq-2`, question: `Who may be a reasonable candidate?`, answer: profile.candidate },
        { id: `${prefix}-faq-3`, question: `How should I think about timing?`, answer: profile.timing },
        { id: `${prefix}-faq-4`, question: `What can it not promise?`, answer: profile.limits },
        { id: `${prefix}-faq-5`, question: `What should I bring to a consultation?`, answer: `Bring a current medication and supplement list, relevant diagnoses and prior treatment history, photos if the concern changes over time, your event calendar, budget, and the one result that matters most to you.` },
      ],
    },
  );
  return items;
}

fs.mkdirSync(backupRoot, { recursive: true });
fs.mkdirSync(path.dirname(archivePath), { recursive: true });
fs.mkdirSync(path.dirname(draftPath), { recursive: true });

const manifest = [];
const archive = [];
const drafts = [];

for (const profile of profiles) {
  const routeDirectory = findRouteDirectory(profile.slug);
  const pagePath = path.join(routeDirectory, "page.tsx");
  const layoutPath = path.join(routeDirectory, "layout.tsx");
  const source = fs.readFileSync(pagePath, "utf8");
  const parsed = parseLegacySource(source, profile);
  const backupRoute = path.join(backupRoot, "routes", path.basename(routeDirectory));
  fs.mkdirSync(backupRoute, { recursive: true });
  for (const sourcePath of [pagePath, layoutPath].filter(fs.existsSync)) {
    const targetPath = path.join(backupRoute, path.basename(sourcePath));
    fs.copyFileSync(sourcePath, targetPath);
    manifest.push({ kind: "source", slug: profile.slug, original: path.relative(repoRoot, sourcePath), backup: path.relative(backupRoot, targetPath), sha256: sha256(sourcePath) });
  }
  for (const image of parsed.images) {
    if (!image.url.startsWith("/")) continue;
    const imagePath = path.join(repoRoot, "public", image.url.replace(/^\//, ""));
    if (!fs.existsSync(imagePath)) throw new Error(`Missing image ${image.url} used by ${profile.slug}`);
    const imageTarget = path.join(backupRoot, "images", image.url.replace(/^\//, ""));
    fs.mkdirSync(path.dirname(imageTarget), { recursive: true });
    fs.copyFileSync(imagePath, imageTarget);
    manifest.push({ kind: "image", slug: profile.slug, original: path.relative(repoRoot, imagePath), backup: path.relative(backupRoot, imageTarget), sha256: sha256(imagePath) });
  }
  const feature = parsed.images[0];
  const originalExcerpt = parsed.blocks.find((block) => block.type === "paragraph")?.text ?? profile.metaDescription;
  archive.push({
    slug: profile.slug,
    title: parsed.oldTitle,
    excerpt: originalExcerpt,
    category: profile.category,
    primaryKeyword: profile.focusKeyword,
    image: feature?.url ?? "",
    imageAlt: feature?.alt ?? `Harmony Med Spa article about ${profile.focusKeyword}`,
    seoTitle: profile.seoTitle,
    metaDescription: profile.metaDescription,
    content: parsed.blocks,
  });
  const content = draftContent(profile, parsed);
  const text = content.flatMap((block) => block.type === "faq" ? block.items.flatMap((item) => [item.question, item.answer]) : [block.text ?? ""]).join(" ");
  drafts.push({
    title: profile.title,
    slug: profile.slug,
    status: "Draft",
    primaryKeyword: profile.focusKeyword,
    category: profile.category,
    cmsData: {
      tags: [...new Set([profile.category, profile.focusKeyword, "Sarasota", "Patient Guide"])],
      excerpt: profile.metaDescription,
      content,
      seoTitle: profile.seoTitle,
      metaDescription: profile.metaDescription,
      relatedServiceUrl: `${siteOrigin}${profile.serviceUrl}`,
      relatedArticleUrls: relatedUrls(profile),
      ctaLabel: "Book a consultation",
      ctaUrl: bookingUrl,
      migrationSource: { legacySlug: profile.slug, legacyTitle: parsed.oldTitle, backupDate: "2026-09-04" },
    },
    wordCount: text.split(/\s+/).filter(Boolean).length,
  });
}

const uniqueSlugs = new Set(drafts.map((draft) => draft.slug));
if (profiles.length !== 27 || uniqueSlugs.size !== 27) throw new Error(`Expected 27 unique profiles, found ${profiles.length}/${uniqueSlugs.size}`);
if (drafts.some((draft) => draft.cmsData.seoTitle.length < 30 || draft.cmsData.seoTitle.length > 60)) throw new Error("An SEO title is outside 30–60 characters");
const invalidDescriptions = drafts
  .filter((draft) => draft.cmsData.metaDescription.length < 120 || draft.cmsData.metaDescription.length > 160)
  .map((draft) => `${draft.slug} (${draft.cmsData.metaDescription.length})`);
if (invalidDescriptions.length) throw new Error(`Meta descriptions outside 120–160 characters: ${invalidDescriptions.join(", ")}`);

fs.writeFileSync(archivePath, JSON.stringify({ generatedAt: "2026-09-04", count: archive.length, posts: archive }, null, 2) + "\n");
fs.writeFileSync(draftPath, JSON.stringify({ generatedAt: "2026-09-04", count: drafts.length, drafts }, null, 2) + "\n");
fs.writeFileSync(path.join(backupRoot, "manifest.json"), JSON.stringify({ createdAt: "2026-09-04", sourceCount: profiles.length, files: manifest }, null, 2) + "\n");

const minimumWords = Math.min(...drafts.map((draft) => draft.wordCount));
console.log(JSON.stringify({ profiles: profiles.length, archive: archive.length, drafts: drafts.length, backupFiles: manifest.length, minimumWords, archivePath, draftPath, backupRoot }, null, 2));

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Paid landing pages and /unsubscribe are excluded with a noindex meta tag, not here:
// a robots.txt Disallow would stop crawlers from seeing that tag.
const DISALLOW = ["/api/"];

// AI search and answer crawlers, allowed explicitly. A crawler that matches a named
// group ignores the "*" group, so each group repeats the Disallow list.
const AI_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_AGENTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}

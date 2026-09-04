import type { MetadataRoute } from "next";
import { listArchivedLegacyBlogs } from "@/lib/blogs/archive";
import { listPublishedBlogs } from "@/lib/blogs/airtable";
import { siteUrl } from "@/lib/site-url";

const staticPaths = [
  "", "/about-us", "/before-and-afters", "/blog", "/contact-us", "/facials",
  "/facials-and-peels", "/hair-restoration", "/iv-therapy", "/membership", "/peptide-therapy",
  "/services", "/shop", "/skincare", "/wellness",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const canonicalSiteUrl = siteUrl();
  const published = await listPublishedBlogs();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    ...staticPaths.map((path) => ({ url: `${canonicalSiteUrl}${path}`, lastModified: now, changeFrequency: path === "/blog" ? "weekly" as const : "monthly" as const })),
    ...listArchivedLegacyBlogs().map((blog) => ({ url: `${canonicalSiteUrl}/blog/${blog.slug}`, lastModified: blog.updatedAt, changeFrequency: "monthly" as const })),
    ...published.map((blog) => ({
      url: `${canonicalSiteUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.publishedAt || now,
      changeFrequency: "monthly" as const,
    })),
  ];
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}

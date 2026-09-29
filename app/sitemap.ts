import type { MetadataRoute } from "next";
import { listArchivedLegacyBlogs } from "@/lib/blogs/archive";
import { listPublishedBlogs } from "@/lib/blogs/airtable";
import type { PublicBlog } from "@/lib/blogs/types";
import { REDIRECTED_BLOG_SLUGS } from "@/lib/blogs/redirects";
import { INDEXABLE_ROUTES } from "@/lib/seo/routes";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const canonicalSiteUrl = siteUrl();

  let published: PublicBlog[] = [];
  try {
    published = await listPublishedBlogs();
  } catch (error) {
    // An Airtable outage must not break the sitemap: keep static and legacy entries.
    console.error("[sitemap] Could not load published blogs from Airtable.", error);
  }

  const entries: MetadataRoute.Sitemap = [
    ...INDEXABLE_ROUTES.map((route) => ({
      url: route.path === "/" ? canonicalSiteUrl : `${canonicalSiteUrl}${route.path}`,
      lastModified: new Date(route.lastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...listArchivedLegacyBlogs().map((blog) => ({
      url: `${canonicalSiteUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Published entries come last so the Map below keeps them over a legacy copy of the same slug.
    ...published.map((blog) => ({
      url: `${canonicalSiteUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.publishedAt || undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  const redirected = new Set([...REDIRECTED_BLOG_SLUGS].map((slug) => `${canonicalSiteUrl}/blog/${slug}`));
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values()).filter((entry) => !redirected.has(entry.url));
}

import type { MetadataRoute } from "next";
import { listArchivedLegacyBlogs } from "@/lib/blogs/archive";
import { listPublishedBlogs } from "@/lib/blogs/airtable";
import { REDIRECTED_BLOG_SLUGS } from "@/lib/blogs/redirects";
import { INDEXABLE_ROUTES } from "@/lib/seo/routes";
import { siteUrl } from "@/lib/site-url";

// Refresh even when a CRM webhook is missed; avoid a frozen build-time snapshot.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const canonicalSiteUrl = siteUrl();

  // Fail regeneration on backend errors so ISR retains its last complete sitemap,
  // rather than caching a successful but incomplete list that drops CRM articles.
  const published = await listPublishedBlogs({ strict: true });

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

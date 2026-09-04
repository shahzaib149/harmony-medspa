import { listPublishedBlogs } from "@/lib/blogs/airtable";
import { listArchivedLegacyBlogs } from "@/lib/blogs/archive";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("search")?.trim().slice(0, 100).toLowerCase() || "";
  if (!query) return Response.json({ results: [] });

  const publishedBlogs = await listPublishedBlogs();
  const publishedSlugs = new Set(publishedBlogs.map((blog) => blog.slug.toLowerCase()));
  const posts = [
    ...publishedBlogs.map((blog) => ({
      title: blog.title,
      href: `/blog/${blog.slug}`,
      excerpt: blog.excerpt,
      imageAlt: blog.primaryKeyword,
    })),
    ...listArchivedLegacyBlogs()
      .filter((blog) => !publishedSlugs.has(blog.slug.toLowerCase()))
      .map((blog) => ({
        title: blog.title,
        href: `/blog/${blog.slug}`,
        excerpt: blog.excerpt,
        imageAlt: blog.primaryKeyword,
      })),
  ];
  const unique = [...new Map(posts.map((post) => [post.href.toLowerCase(), post])).values()];
  const results = unique
    .filter((post) => `${post.title} ${post.excerpt} ${post.imageAlt} ${post.href}`.toLowerCase().includes(query))
    .slice(0, 8)
    .map(({ title, href }) => ({ title, href }));

  return Response.json(
    { results },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
  );
}

import archiveData from "@/content/legacy-blog-archive.json";
import profilePartOne from "@/scripts/legacy-migration-profiles-1.json";
import profilePartTwo from "@/scripts/legacy-migration-profiles-2.json";
import profilePartThree from "@/scripts/legacy-migration-profiles-3.json";
import type { PublicBlog, PublicBlogBlock } from "@/lib/blogs/types";
import { siteUrl } from "@/lib/site-url";

type ArchivedPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  primaryKeyword: string;
  image: string;
  imageAlt: string;
  seoTitle: string;
  metaDescription: string;
  content: PublicBlogBlock[];
};

const seoProfiles = [...profilePartOne, ...profilePartTwo, ...profilePartThree];

function publicImageUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl()}${value.startsWith("/") ? value : `/${value}`}`;
}

function toPublicBlog(post: ArchivedPost): PublicBlog {
  const profile = seoProfiles.find((item) => item.slug === post.slug);
  const feature: PublicBlogBlock[] = post.image ? [{
    id: `${post.slug}-archived-image`,
    type: "image",
    url: publicImageUrl(post.image),
    alt: post.imageAlt,
    caption: "",
  }] : [];
  return {
    id: `legacy-${post.slug}`,
    title: post.title,
    slug: post.slug.toLowerCase(),
    status: "Published",
    primaryKeyword: post.primaryKeyword,
    category: post.category,
    tags: [post.category, post.primaryKeyword, "Sarasota"].filter(Boolean),
    excerpt: post.excerpt,
    content: [...feature, ...post.content],
    seoTitle: profile?.seoTitle || post.seoTitle || post.title,
    metaDescription: profile?.metaDescription || post.metaDescription || post.excerpt,
    relatedServiceUrl: "",
    relatedArticleUrls: [],
    ctaLabel: "Book a consultation",
    ctaUrl: "https://na02.patientnow.com/a/HARMONYMEDSPA/OnlineBooking.aspx",
    createdAt: "2026-09-04T00:00:00.000Z",
    updatedAt: "2026-09-04T00:00:00.000Z",
    publishedAt: null,
  };
}

const archivedBlogs = (archiveData.posts as ArchivedPost[]).map(toPublicBlog);

export function listArchivedLegacyBlogs() {
  return archivedBlogs;
}

export function getArchivedLegacyBlogBySlug(slug: string) {
  return archivedBlogs.find((blog) => blog.slug === slug.toLowerCase()) ?? null;
}

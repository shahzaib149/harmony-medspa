import type { Metadata } from "next";
import { allLegacyBlogPosts } from "@/lib/blogs/legacy-posts";
import { CANONICAL_SITE_URL } from "@/lib/site-url";

function atWordBoundary(value: string, maximum: number) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= maximum) return clean;
  const shortened = clean.slice(0, maximum - 3);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > 30 ? boundary : shortened.length).replace(/[,:;.!?-]+$/, "")}...`;
}

export function legacyBlogMetadata(slug: string): Metadata {
  const pathname = `/blog/${slug}`;
  const post = allLegacyBlogPosts.find((entry) => entry.href.toLowerCase() === pathname.toLowerCase());
  if (!post) return {};

  const title = atWordBoundary(post.title, 60);
  const description = atWordBoundary(post.excerpt, 155);
  const canonical = `${CANONICAL_SITE_URL}${pathname}`;
  const image = new URL(post.image, CANONICAL_SITE_URL).toString();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName: "Harmony Med Spa",
      title,
      description,
      url: canonical,
      images: [{ url: image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

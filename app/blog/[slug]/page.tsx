import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleImage from "@/components/blog/ArticleImage";
import BlogSearchForm from "@/components/blog/BlogSearchForm";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { getArchivedLegacyBlogBySlug } from "@/lib/blogs/archive";
import { getPublishedBlogBySlug } from "@/lib/blogs/airtable";
import { firstPublicBlogImage, type PublicBlog, type PublicBlogBlock } from "@/lib/blogs/types";
import { canonicalPublicUrl, siteUrl } from "@/lib/site-url";

export const revalidate = 300;

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function lines(text: string) {
  return text.split("\n").map((item) => item.trim()).filter(Boolean);
}

function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function readingTime(blog: PublicBlog) {
  const words = blog.content.flatMap((block) => block.type === "faq"
    ? block.items.flatMap((item) => `${item.question} ${item.answer}`.split(/\s+/))
    : block.type === "image" ? [] : block.text.split(/\s+/)).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 220));
}

async function findBlog(slug: string) {
  return await getPublishedBlogBySlug(slug) ?? getArchivedLegacyBlogBySlug(slug);
}

function BlogBlock({ block }: { block: PublicBlogBlock }) {
  if (block.type === "image") {
    return (
      <figure className="my-10 overflow-hidden rounded-[22px] border border-[#ebe4d8] bg-[#f4f1eb] shadow-[0_18px_50px_rgba(42,35,24,0.08)]">
        <ArticleImage className="block aspect-[16/9] h-auto w-full object-cover" url={block.url} alt={block.alt} loading="lazy" />
        {block.caption ? <figcaption className="px-5 py-4 text-sm leading-6 text-[#71685d]">{block.caption}</figcaption> : null}
      </figure>
    );
  }
  if (block.type === "heading2") return <h2 id={headingId(block.text)}>{block.text}</h2>;
  if (block.type === "heading3") return <h3>{block.text}</h3>;
  if (block.type === "bulleted-list") return <ul>{lines(block.text).map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === "numbered-list") return <ol>{lines(block.text).map((item) => <li key={item}>{item}</li>)}</ol>;
  if (block.type === "quote") return <blockquote><p>{block.text}</p></blockquote>;
  if (block.type === "faq") {
    if (!block.items.length) return null;
    return (
      <section aria-labelledby={`${block.id}-title`} className="mt-14">
        <h2 id={`${block.id}-title`}>Frequently asked questions</h2>
        <div className="mt-6 grid gap-3">
          {block.items.map((item) => (
            <details key={item.id} className="group rounded-2xl border border-[#e7dfd2] bg-[#fbfaf7] px-5 py-1 open:bg-white open:shadow-[0_12px_32px_rgba(44,35,22,0.07)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 font-semibold leading-6 text-[#2f3944] marker:content-none">
                <span>{item.question}</span><span aria-hidden="true" className="text-2xl font-light text-[#b9861b] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mb-5 mt-0 pr-8 text-[17px] leading-8 text-[#5b6470]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    );
  }
  return <p>{block.text}</p>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await findBlog(slug);
  if (!blog) return {};
  const canonical = `${siteUrl()}/blog/${blog.slug}`;
  const image = firstPublicBlogImage(blog);
  const imageUrl = image ? canonicalPublicUrl(image.url) : null;
  const seoTitle = blog.seoTitle || blog.title;
  return {
    title: { absolute: seoTitle },
    description: blog.metaDescription || blog.excerpt,
    keywords: [blog.primaryKeyword, ...blog.tags].filter(Boolean),
    alternates: { canonical },
    openGraph: {
      type: "article", siteName: "Harmony Med Spa", title: seoTitle,
      description: blog.metaDescription || blog.excerpt, url: canonical,
      publishedTime: blog.publishedAt || undefined, modifiedTime: blog.updatedAt || undefined,
      images: imageUrl ? [{ url: imageUrl, alt: image?.alt || "" }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary", title: seoTitle,
      description: blog.metaDescription || blog.excerpt, images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function PublishedBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await findBlog(slug);
  if (!blog) notFound();

  const origin = siteUrl();
  const canonical = `${origin}/blog/${blog.slug}`;
  const image = firstPublicBlogImage(blog);
  const contentWithoutFeature = blog.content.filter((block) => block.type !== "image" || block.url !== image?.url);
  const headings = contentWithoutFeature.flatMap((block) => block.type === "heading2" ? [block.text] : []);
  const faqItems = blog.content.flatMap((block) => block.type === "faq" ? block.items : []);
  const minutes = readingTime(blog);
  const articleSchema = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    publisher: { "@type": "Organization", name: "Harmony Med Spa", url: origin, logo: { "@type": "ImageObject", url: `${origin}/images/logo-transparent.png` } },
    author: { "@type": "Organization", name: "Harmony Med Spa Editorial Team", url: origin },
    datePublished: blog.publishedAt || undefined, dateModified: blog.updatedAt || undefined,
    image: image ? canonicalPublicUrl(image.url) : undefined,
    articleSection: blog.category || undefined,
    keywords: [blog.primaryKeyword, ...blog.tags].filter(Boolean).join(", "),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${origin}/blog` },
      { "@type": "ListItem", position: 3, name: blog.title, item: canonical },
    ],
  };
  const faqSchema = faqItems.length ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  } : null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f7f4] text-[#26313c]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} /> : null}
      <SiteHeader className="contact-page-header" />

      <header className="relative isolate overflow-hidden bg-[#11110f] px-6 py-20 text-white sm:py-24">
        <div className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(circle_at_18%_20%,rgba(214,164,55,.24),transparent_27%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,.08),transparent_32%),repeating-linear-gradient(32deg,rgba(255,255,255,.025)_0_1px,transparent_1px_9px)]" />
        <div className="mx-auto max-w-[1040px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-white/65">
            <Link href="/" className="transition hover:text-white">Home</Link><span aria-hidden="true">/</span>
            <Link href="/blog" className="transition hover:text-white">Blog</Link><span aria-hidden="true">/</span>
            <span className="text-white/85">{blog.category || "Patient guide"}</span>
          </nav>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
            <span className="rounded-full border border-[#c99a32]/45 bg-[#c99a32]/10 px-4 py-2 text-[#e9bf65]">{blog.category || "Harmony guide"}</span>
            <span className="text-white/55">{minutes} min read</span>
          </div>
          <h1 className="m-0 max-w-[980px] text-balance font-light leading-[1.06] text-[#e4ad34] [font-size:clamp(2.35rem,5vw,4.7rem)]">{blog.title}</h1>
          <p className="mb-0 mt-7 max-w-[800px] text-lg leading-8 text-white/72 sm:text-xl">{blog.excerpt}</p>
        </div>
      </header>

      <div className="mx-auto grid w-[min(calc(100%_-_32px),1240px)] grid-cols-1 items-start gap-10 py-14 lg:grid-cols-[minmax(0,830px)_300px] lg:gap-16 lg:py-20">
        <article className="min-w-0 rounded-[28px] border border-[#ebe6dc] bg-white px-5 py-6 shadow-[0_22px_70px_rgba(55,47,35,0.07)] sm:px-10 sm:py-10 lg:px-14">
          {image ? (
            <figure className="m-0 overflow-hidden rounded-[22px] bg-[#eee]">
              <ArticleImage className="block aspect-[16/9] h-auto w-full object-cover" url={image.url} alt={image.alt} loading="eager" />
              {image.caption ? <figcaption className="px-5 py-4 text-sm leading-6 text-[#71685d]">{image.caption}</figcaption> : null}
            </figure>
          ) : null}

          {headings.length ? (
            <nav aria-label="Article contents" className="my-9 rounded-2xl border border-[#e8dfcf] bg-[#fbf8f1] p-5 sm:p-6">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-[#a57415]">In this guide</p>
              <ol className="mb-0 mt-4 grid gap-2 pl-5 text-[15px] leading-6 text-[#4c5864] sm:grid-cols-2 sm:gap-x-8">
                {headings.map((heading) => <li key={heading}><a className="hover:text-[#a57415]" href={`#${headingId(heading)}`}>{heading}</a></li>)}
              </ol>
            </nav>
          ) : null}

          <div className="text-[18px] leading-[1.85] text-[#4c5864] [&_a]:font-medium [&_a]:text-[#a87412] [&_a]:underline-offset-4 hover:[&_a]:underline [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#d5a23d] [&_blockquote]:bg-[#fbf8f1] [&_blockquote]:px-6 [&_blockquote]:py-4 [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-[clamp(1.65rem,3vw,2.2rem)] [&_h2]:font-medium [&_h2]:leading-tight [&_h2]:text-[#b67f13] [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#2e3944] [&_li]:mb-2 [&_ol]:my-6 [&_p]:mb-5 [&_p]:mt-0 [&_ul]:my-6">
            {contentWithoutFeature.map((block) => <BlogBlock block={block} key={block.id} />)}

            {blog.relatedServiceUrl || blog.relatedArticleUrls.length ? (
              <section className="mt-14 border-t border-[#e8e2d8] pt-8">
                <h2 className="!mt-0">Continue exploring</h2>
                <div className="grid gap-3">
                  {blog.relatedServiceUrl ? <a className="rounded-xl border border-[#e7dfd2] px-5 py-3" href={blog.relatedServiceUrl}>View the related Harmony service →</a> : null}
                  {blog.relatedArticleUrls.map((url, index) => <a className="rounded-xl border border-[#e7dfd2] px-5 py-3" href={url} key={url}>Read related article {index + 1} →</a>)}
                </div>
              </section>
            ) : null}
          </div>

          {blog.ctaLabel && blog.ctaUrl ? (
            <section className="mt-12 rounded-[24px] bg-[#171713] px-6 py-8 text-white sm:px-9">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#d8aa4b]">Personalized care in Sarasota</p>
              <h2 className="mb-3 mt-3 text-2xl font-medium">Ready to discuss your options?</h2>
              <p className="mb-6 mt-0 leading-7 text-white/70">A consultation connects the information in this guide to your health history, goals, timeline, and budget.</p>
              <a className="inline-flex rounded-full bg-[#d7a43b] px-6 py-3 font-semibold text-[#171713] transition hover:bg-[#edc66f]" href={blog.ctaUrl} target={blog.ctaUrl.startsWith(origin) ? undefined : "_blank"} rel={blog.ctaUrl.startsWith(origin) ? undefined : "noopener noreferrer"}>{blog.ctaLabel}</a>
            </section>
          ) : null}
        </article>

        <aside className="grid gap-5 lg:sticky lg:top-6" aria-label="Blog tools">
          <section className="rounded-[22px] border border-[#e7e1d7] bg-white p-5 shadow-[0_16px_45px_rgba(55,47,35,0.06)]">
            <p className="mb-4 mt-0 text-xs font-bold uppercase tracking-[0.16em] text-[#9f741d]">Find an article</p>
            <BlogSearchForm />
          </section>
          <Link className="group relative grid min-h-[230px] place-items-center overflow-hidden rounded-[22px] text-center text-white shadow-[0_18px_48px_rgba(30,27,22,0.16)]" href="/services">
            <Image src="/images/blogs/blog-1/img_1.png" alt="Harmony Med Spa treatment room" fill sizes="300px" className="object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-black/50" />
            <span className="relative px-6"><strong className="block text-2xl font-medium">Explore services</strong><small className="mt-3 inline-block border-b border-[#ddb04e] pb-1 text-sm">View all treatments</small></span>
          </Link>
          <section className="rounded-[22px] border border-[#e1d4ba] bg-[#f5ecdb] p-6">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-[#9b711d]">Medical note</p>
            <p className="mb-0 mt-3 text-[15px] leading-7 text-[#5e584f]">This guide is educational and does not replace an individualized diagnosis or treatment plan.</p>
          </section>
        </aside>
      </div>

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogSearchForm from "@/components/blog/BlogSearchForm";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { listArchivedLegacyBlogs } from "@/lib/blogs/archive";
import { listPublishedBlogs } from "@/lib/blogs/airtable";
import { firstPublicBlogImage, imageSourceForSite, type PublicBlog } from "@/lib/blogs/types";
import { siteUrl } from "@/lib/site-url";

const PAGE_SIZE = 9;

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Harmony Med Spa Blog | Sarasota Treatment Guides" },
  description: "Read practical Sarasota guides to injectables, skin treatments, medical weight loss, hormones, IV therapy, safety, recovery, and treatment planning.",
  alternates: { canonical: `${siteUrl()}/blog` },
};

function wordCount(blog: PublicBlog) {
  return blog.content.reduce((total, block) => {
    if (block.type === "image") return total;
    if (block.type === "faq") return total + block.items.reduce((sum, item) => sum + `${item.question} ${item.answer}`.split(/\s+/).length, 0);
    return total + block.text.split(/\s+/).length;
  }, 0);
}

function toCard(blog: PublicBlog) {
  const image = firstPublicBlogImage(blog);
  return {
    title: blog.title,
    image: image ? imageSourceForSite(image.url) : "/images/logo.jpg",
    imageAlt: image?.alt || `${blog.title} at Harmony Med Spa`,
    href: `/blog/${blog.slug}`,
    excerpt: blog.excerpt,
    category: blog.category || "Patient guide",
    minutes: Math.max(3, Math.ceil(wordCount(blog) / 220)),
  };
}

function pageHref(page: number) {
  return page === 1 ? "/blog" : `/blog?page=${page}`;
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ search?: string | string[]; page?: string | string[] }> }) {
  const values = await searchParams;
  const requestedSearch = values.search;
  const query = (Array.isArray(requestedSearch) ? requestedSearch[0] : requestedSearch || "").trim();
  const normalizedQuery = query.toLowerCase();
  const requestedPageValue = Array.isArray(values.page) ? values.page[0] : values.page;
  const requestedPage = Math.max(1, Number.parseInt(requestedPageValue || "1", 10) || 1);

  const publishedBlogs = await listPublishedBlogs();
  const publishedSlugs = new Set(publishedBlogs.map((blog) => blog.slug.toLowerCase()));
  const blogs = [
    ...publishedBlogs,
    ...listArchivedLegacyBlogs().filter((blog) => !publishedSlugs.has(blog.slug.toLowerCase())),
  ];
  const matchingBlogs = normalizedQuery
    ? blogs.filter((blog) => `${blog.title} ${blog.excerpt} ${blog.category} ${blog.primaryKeyword} ${blog.tags.join(" ")}`.toLowerCase().includes(normalizedQuery))
    : blogs;
  const totalPages = Math.max(1, Math.ceil(matchingBlogs.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const cards = (normalizedQuery ? matchingBlogs : matchingBlogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)).map(toCard);
  const categories = [...new Set(blogs.map((blog) => blog.category).filter(Boolean))].sort();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f7f4] text-[#26313c]">
      <SiteHeader className="contact-page-header" />

      <header className="relative isolate overflow-hidden bg-[#11110f] px-6 py-20 text-white sm:py-24">
        <div className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(circle_at_18%_20%,rgba(214,164,55,.24),transparent_27%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,.08),transparent_32%),repeating-linear-gradient(32deg,rgba(255,255,255,.025)_0_1px,transparent_1px_9px)]" />
        <div className="mx-auto max-w-[1120px] text-center">
          <p className="mb-5 mt-0 text-xs font-semibold uppercase tracking-[0.2em] text-[#e2b554]">Harmony Med Spa · Sarasota</p>
          <h1 className="m-0 break-words text-balance font-light leading-none text-[#e4ad34] [font-size:clamp(2.4rem,7vw,5.8rem)]">Treatment insights,<br className="hidden sm:block" /> made practical</h1>
          <p className="mx-auto mb-0 mt-7 max-w-[720px] text-lg leading-8 text-white/70">Straightforward guides to benefits, limitations, recovery, safety, and the questions worth asking before you book.</p>
        </div>
      </header>

      <section className="mx-auto w-[min(calc(100%_-_32px),1240px)] py-14 lg:py-20">
        <div className="mb-10 grid items-end gap-7 border-b border-[#ded8cd] pb-9 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.17em] text-[#9f741d]">Harmony health library</p>
            <h2 className="mb-3 mt-3 text-[clamp(2rem,4vw,3.35rem)] font-light leading-tight text-[#26313c]">Useful answers for real treatment decisions</h2>
            <p className="m-0 max-w-[720px] text-[17px] leading-8 text-[#606a74]">Explore clinically grounded topics across aesthetics, wellness, hormones, and weight management—written for people, not search engines.</p>
          </div>
          <BlogSearchForm defaultValue={query} />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-14">
          <div className="min-w-0">
            {normalizedQuery ? (
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e3ddd2] bg-white px-5 py-4">
                <p className="m-0 text-[#4f5964]"><strong className="text-[#27323d]">{matchingBlogs.length}</strong> result{matchingBlogs.length === 1 ? "" : "s"} for “{query}”</p>
                <Link href="/blog" className="text-sm font-semibold text-[#a77515] hover:underline">Clear search</Link>
              </div>
            ) : null}

            {cards.length ? (
              <div className="grid gap-6 md:grid-cols-2">
                {cards.map((post, index) => (
                  <article className={`group overflow-hidden rounded-[24px] border border-[#e6e0d6] bg-white shadow-[0_15px_45px_rgba(47,40,29,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(47,40,29,0.12)] ${!normalizedQuery && currentPage === 1 && index === 0 ? "md:col-span-2 md:grid md:grid-cols-[1.08fr_.92fr]" : ""}`} key={post.href}>
                    <Link href={post.href} className={`relative block overflow-hidden bg-[#eee] ${!normalizedQuery && currentPage === 1 && index === 0 ? "min-h-[280px] md:min-h-[390px]" : "aspect-[16/10]"}`} aria-label={`Read ${post.title}`}>
                      <Image src={post.image} alt={post.imageAlt} fill sizes={!normalizedQuery && currentPage === 1 && index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 34vw"} className="object-cover transition duration-500 group-hover:scale-[1.035]" priority={!normalizedQuery && currentPage === 1 && index === 0} />
                    </Link>
                    <div className={`flex flex-col p-6 ${!normalizedQuery && currentPage === 1 && index === 0 ? "justify-center sm:p-9" : ""}`}>
                      <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em]">
                        <span className="text-[#a57415]">{post.category}</span><span className="h-1 w-1 rounded-full bg-[#cab98f]" /><span className="text-[#7b838b]">{post.minutes} min read</span>
                      </div>
                      <h3 className={`m-0 text-balance font-medium leading-[1.22] text-[#27323d] ${!normalizedQuery && currentPage === 1 && index === 0 ? "text-[clamp(1.7rem,3.2vw,2.5rem)]" : "text-[1.45rem]"}`}><Link href={post.href} className="transition hover:text-[#a57415]">{post.title}</Link></h3>
                      <p className="mb-0 mt-4 line-clamp-4 text-[16px] leading-7 text-[#626b74]">{post.excerpt}</p>
                      <Link className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[#c59129] pb-1 text-sm font-bold text-[#7c5a17] transition group-hover:gap-3" href={post.href}>Read the guide <span aria-hidden="true">→</span></Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-[#e4ddd1] bg-white px-7 py-12 text-center">
                <h2 className="m-0 text-2xl font-medium text-[#2c3742]">No articles found</h2>
                <p className="mb-0 mt-3 text-[#68717a]">Try a broader treatment, concern, or wellness keyword.</p>
              </div>
            )}

            {!normalizedQuery && totalPages > 1 ? (
              <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pages">
                {currentPage > 1 ? <Link className="mr-2 rounded-full border border-[#dcd4c6] bg-white px-5 py-3 text-sm font-semibold text-[#4c5660] hover:border-[#c4922c]" href={pageHref(currentPage - 1)}>← Previous</Link> : null}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => page === currentPage
                  ? <span key={page} aria-current="page" className="grid h-11 w-11 place-items-center rounded-full bg-[#1e211f] text-sm font-bold text-white">{page}</span>
                  : <Link key={page} aria-label={`Page ${page}`} className="grid h-11 w-11 place-items-center rounded-full border border-[#dcd4c6] bg-white text-sm font-semibold text-[#4c5660] hover:border-[#c4922c] hover:text-[#946812]" href={pageHref(page)}>{page}</Link>)}
                {currentPage < totalPages ? <Link className="ml-2 rounded-full border border-[#dcd4c6] bg-white px-5 py-3 text-sm font-semibold text-[#4c5660] hover:border-[#c4922c]" href={pageHref(currentPage + 1)}>Next →</Link> : null}
              </nav>
            ) : null}
          </div>

          <aside className="grid gap-5 lg:sticky lg:top-6" aria-label="Blog categories and links">
            <section className="rounded-[22px] border border-[#e4ddd2] bg-white p-6">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-[#9f741d]">Explore by topic</p>
              <div className="mt-5 grid gap-1">
                {categories.map((category) => <Link key={category} href={`/blog?search=${encodeURIComponent(category)}`} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] text-[#4f5964] transition hover:bg-[#f7f1e5] hover:text-[#8d6414]"><span>{category}</span><span aria-hidden="true">→</span></Link>)}
              </div>
            </section>
            <Link className="group relative grid min-h-[260px] place-items-center overflow-hidden rounded-[22px] text-center text-white shadow-[0_18px_48px_rgba(30,27,22,0.15)]" href="/services">
              <Image src="/images/blogs/blog-1/img_1.png" alt="Harmony Med Spa treatment room" fill sizes="270px" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-black/50" />
              <span className="relative px-6"><strong className="block text-2xl font-medium">Explore services</strong><small className="mt-3 inline-block border-b border-[#ddb04e] pb-1 text-sm">View all treatments</small></span>
            </Link>
            <section className="rounded-[22px] bg-[#1d211f] p-6 text-white">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-[#d7a844]">Need personal guidance?</p>
              <p className="mb-5 mt-3 text-[15px] leading-7 text-white/70">Bring your goals and questions to a one-on-one consultation in Sarasota.</p>
              <Link href="/contact-us" className="inline-flex rounded-full bg-[#d7a43b] px-5 py-2.5 text-sm font-bold text-[#1a1d1b] hover:bg-[#edc66f]">Contact Harmony</Link>
            </section>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

// JSON-LD builders. Every business fact comes from lib/constants.ts; never add a fact
// here that the site does not already state. Schema must only describe content that
// is visible on the page it is rendered on.
import {
  ADDRESS_CITY,
  ADDRESS_COUNTRY,
  ADDRESS_POSTAL_CODE,
  ADDRESS_REGION,
  ADDRESS_STREET,
  AREA_SERVED,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LOGO_PATH,
  PHONE_TEL,
  SITE_NAME,
  YELP_URL,
} from "@/lib/constants";
import type { IndexableRoute } from "@/lib/seo/routes";
import { INDEXABLE_ROUTES } from "@/lib/seo/routes";
import { siteUrl } from "@/lib/site-url";

export type JsonLdObject = { "@context"?: "https://schema.org"; "@type": string; [key: string]: unknown };

const CONTEXT = "https://schema.org" as const;

function absoluteUrl(path: string) {
  const origin = siteUrl();
  return path === "/" ? origin : `${origin}${path}`;
}

export const schemaIds = {
  clinic: () => `${siteUrl()}/#clinic`,
  website: () => `${siteUrl()}/#website`,
  person: (slug: string) => `${siteUrl()}/our-team#${slug}`,
};

const clinicRef = () => ({ "@id": schemaIds.clinic() });

export function buildMedicalClinicSchema(): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "MedicalClinic",
    "@id": schemaIds.clinic(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl(LOGO_PATH),
    image: absoluteUrl(LOGO_PATH),
    telephone: `+1${PHONE_TEL}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: ADDRESS_CITY,
      addressRegion: ADDRESS_REGION,
      postalCode: ADDRESS_POSTAL_CODE,
      addressCountry: ADDRESS_COUNTRY,
    },
    // geo, hasMap (Google Business Profile) and openingHoursSpecification are left out
    // until the client confirms GEO_*, GOOGLE_MAPS_BUSINESS_URL and the hours constants.
    areaServed: AREA_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL, YELP_URL],
  };
}

export function buildWebSiteSchema(): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": schemaIds.website(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    publisher: clinicRef(),
    inLanguage: "en-US",
  };
}

export type ProviderInput = {
  slug: string;
  name: string;
  honorificSuffix?: string;
  jobTitle?: string;
  /** Only text that is visible on /our-team without opening the modal. */
  description?: string;
  image?: string;
};

export function buildPersonSchema(provider: ProviderInput): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "Person",
    "@id": schemaIds.person(provider.slug),
    name: provider.name,
    ...(provider.honorificSuffix ? { honorificSuffix: provider.honorificSuffix } : {}),
    ...(provider.jobTitle ? { jobTitle: provider.jobTitle } : {}),
    ...(provider.description ? { description: provider.description } : {}),
    ...(provider.image ? { image: absoluteUrl(provider.image) } : {}),
    url: absoluteUrl("/our-team"),
    worksFor: clinicRef(),
  };
}

export function buildServiceSchema({ name, url, description }: { name: string; url: string; description?: string }): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    name,
    serviceType: name,
    url: absoluteUrl(url),
    ...(description ? { description } : {}),
    provider: clinicRef(),
    areaServed: AREA_SERVED.map((area) => ({ "@type": "AdministrativeArea", name: area })),
  };
}

export type FaqItem = { question: string; answer: string };

/**
 * Visible FAQs kept out of structured data. Schema is machine-read as fact, so these
 * unsourced medical safety claims stay out until the provider reviews the page copy.
 * Schema may be a subset of the visible FAQ, never a superset.
 */
export const SCHEMA_EXCLUDED_FAQ_QUESTIONS = new Set([
  "Are GLP-1 medications safe?", // /medical-weight-loss
  "Is Semaglutide safe?", // /semaglutide
  "Is Tirzepatide safe?", // /tirzepatide
]);

/** Build only from the same FAQ array the page renders, so schema never outruns the page. */
export function buildFaqPageSchema(faqs: readonly FaqItem[]): JsonLdObject | null {
  const included = faqs.filter((faq) => !SCHEMA_EXCLUDED_FAQ_QUESTIONS.has(faq.question));
  if (!included.length) return null;
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: included.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export type BlogPostingInput = {
  headline: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
  keywords?: string;
};

export function buildBlogPostingSchema(blog: BlogPostingInput): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    headline: blog.headline,
    description: blog.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": blog.url },
    publisher: clinicRef(),
    author: { "@type": "Organization", name: `${SITE_NAME} Editorial Team`, url: absoluteUrl("/") },
    datePublished: blog.datePublished,
    dateModified: blog.dateModified,
    image: blog.image,
    articleSection: blog.section,
    keywords: blog.keywords,
  };
}

export type BreadcrumbItem = { name: string; url: string };

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: /^https?:\/\//.test(item.url) ? item.url : absoluteUrl(item.url),
    })),
  };
}

/** Breadcrumb trail for a registered route: Home > parent chain (default /services) > page. */
export function breadcrumbTrail(route: IndexableRoute): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [{ name: route.name, url: route.path }];
  let parentPath: string | undefined = route.parent ?? "/services";
  while (parentPath && parentPath !== "/") {
    const parent = INDEXABLE_ROUTES.find((entry) => entry.path === parentPath);
    if (!parent) break;
    trail.unshift({ name: parent.name, url: parent.path });
    parentPath = parent.parent ?? (parent.path === "/services" ? undefined : "/services");
  }
  return [{ name: "Home", url: "/" }, ...trail];
}

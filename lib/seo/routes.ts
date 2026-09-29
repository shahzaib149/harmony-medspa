import type { MetadataRoute } from "next";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type IndexableRoute = {
  path: string;
  /** Display name used in breadcrumbs and Service schema. */
  name: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** ISO date of the last meaningful edit. Update it when you change the page. */
  lastModified: string;
  /**
   * "treatment" pages get Service + BreadcrumbList schema; "category" hubs that list
   * treatments get BreadcrumbList only.
   */
  schema?: "treatment" | "category";
  /** Breadcrumb parent path. Defaults to /services. */
  parent?: string;
};

/**
 * Every indexable public route, in one place. The sitemap and the page schema read
 * from this list, and each listed page declares a matching self-canonical.
 *
 * Deliberately left out:
 * - /landing, /landing-v1, /landing/*: paid ad destinations, noindex.
 * - /unsubscribe: utility page, noindex.
 * - /book-now: redirects to the external PatientNow booking page.
 * - /jeuveau: permanently redirects to a blog post.
 * - /learn-more, /specials: redirect to Mailchimp pages.
 * - /blog/[slug]: added from the blog sources in app/sitemap.ts.
 */
export const INDEXABLE_ROUTES: IndexableRoute[] = [
  { path: "/", name: "Home", priority: 1.0, changeFrequency: "weekly", lastModified: "2026-09-01" },

  // Core and primary revenue pages
  { path: "/medical-weight-loss", name: "Medical Weight Loss", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/injectables", name: "Injectables", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "category" },
  { path: "/our-team", name: "Our Team", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-29" },
  { path: "/services", name: "Services", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-29" },
  { path: "/contact-us", name: "Contact Us", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-29" },

  // Treatment pages
  { path: "/semaglutide", name: "Semaglutide", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-01", schema: "treatment", parent: "/medical-weight-loss" },
  { path: "/tirzepatide", name: "Tirzepatide", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-01", schema: "treatment", parent: "/medical-weight-loss" },
  { path: "/hormone-replacement-therapy", name: "Hormone Replacement Therapy", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/peptide-therapy", name: "Peptide Therapy", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/iv-therapy", name: "IV Therapy", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/sculptra", name: "Sculptra", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/dermal-fillers", name: "Dermal Fillers", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/daxxify", name: "Daxxify", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/rf-microneedling", name: "RF Microneedling", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/lasers-and-lights", name: "Lasers and Lights", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "category" },
  { path: "/laser-hair-removal", name: "Laser Hair Removal", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/fractional-co2-laser-treatments", name: "Fractional CO2 Laser Treatments", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/hair-restoration", name: "Hair Restoration", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/chemical-peels", name: "Chemical Peels", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/facials", name: "Facials", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/facials-and-peels", name: "Facials and Peels", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "category" },
  { path: "/glo2facials", name: "Glo2Facial", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "treatment" },
  { path: "/body", name: "Body", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "category" },
  { path: "/skincare", name: "Skincare", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "category" },
  { path: "/wellness", name: "Wellness", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-29", schema: "category" },
  { path: "/blog", name: "Blog", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-09-29" },

  // Supporting, trust and commerce pages
  { path: "/about-us", name: "About Us", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-09-29" },
  { path: "/testimonials", name: "Testimonials", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-09-29" },
  { path: "/before-and-afters", name: "Before & After Gallery", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-28" },
  { path: "/membership", name: "Membership", priority: 0.6, changeFrequency: "monthly", lastModified: "2026-09-29" },
  { path: "/events", name: "Events", priority: 0.5, changeFrequency: "weekly", lastModified: "2026-09-29" },
  { path: "/shop", name: "Shop", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-09-29" },
  { path: "/skincare-products", name: "Skincare Products", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-09-29" },
  { path: "/patient-forms", name: "Patient Forms", priority: 0.4, changeFrequency: "yearly", lastModified: "2026-09-29" },
  { path: "/payment-plans", name: "Payment Plans", priority: 0.4, changeFrequency: "yearly", lastModified: "2026-09-29" },
];

/**
 * Blog slugs that next.config.ts permanently redirects elsewhere. Keep in sync with
 * its redirects() list so the sitemap never lists a URL that redirects.
 */
export const REDIRECTED_BLOG_SLUGS = new Set(["revivamask-recovery-mask-sarasota"]);

export function indexableRoute(path: string) {
  const route = INDEXABLE_ROUTES.find((entry) => entry.path === path);
  if (!route) throw new Error(`No indexable route registered for ${path}`);
  return route;
}

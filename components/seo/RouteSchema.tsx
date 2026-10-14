import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICE_PRICING, type PriceItem } from "@/lib/data/pricing";
import { breadcrumbTrail, buildBreadcrumbSchema, buildFaqPageSchema, buildServiceSchema, type FaqItem } from "@/lib/schema";
import { indexableRoute } from "@/lib/seo/routes";

/**
 * Breadcrumb (and, for treatment pages, Service) schema for a registered route.
 * Pass `faqs` only when the page renders that exact array visibly. Service offers default to
 * the prices the page's ServicePricing block shows; pass `prices` when the page lists others.
 */
export default function RouteSchema({ path, faqs, prices }: { path: string; faqs?: readonly FaqItem[]; prices?: readonly PriceItem[] }) {
  const route = indexableRoute(path);
  const schemas: object[] = [buildBreadcrumbSchema(breadcrumbTrail(route))];
  if (route.schema === "treatment") {
    const visiblePrices = prices ?? SERVICE_PRICING[path]?.groups.flatMap((group) => group.items);
    schemas.push(buildServiceSchema({ name: route.name, url: route.path, prices: visiblePrices }));
  }
  const faqSchema = faqs ? buildFaqPageSchema(faqs) : null;
  if (faqSchema) schemas.push(faqSchema);
  return <JsonLd data={schemas} />;
}

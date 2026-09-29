import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbTrail, buildBreadcrumbSchema, buildFaqPageSchema, buildServiceSchema, type FaqItem } from "@/lib/schema";
import { indexableRoute } from "@/lib/seo/routes";

/**
 * Breadcrumb (and, for treatment pages, Service) schema for a registered route.
 * Pass `faqs` only when the page renders that exact array visibly.
 */
export default function RouteSchema({ path, faqs }: { path: string; faqs?: readonly FaqItem[] }) {
  const route = indexableRoute(path);
  const schemas: object[] = [buildBreadcrumbSchema(breadcrumbTrail(route))];
  if (route.schema === "treatment") schemas.push(buildServiceSchema({ name: route.name, url: route.path }));
  const faqSchema = faqs ? buildFaqPageSchema(faqs) : null;
  if (faqSchema) schemas.push(faqSchema);
  return <JsonLd data={schemas} />;
}

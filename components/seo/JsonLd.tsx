// Renders structured data as JSON-LD. "<" is escaped so no string in the payload can
// close the script tag (see node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

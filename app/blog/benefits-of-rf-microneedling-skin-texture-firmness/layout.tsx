import { legacyBlogMetadata } from "@/lib/blogs/legacy-metadata";

export const metadata = legacyBlogMetadata("benefits-of-rf-microneedling-skin-texture-firmness");

export default function LegacyBlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

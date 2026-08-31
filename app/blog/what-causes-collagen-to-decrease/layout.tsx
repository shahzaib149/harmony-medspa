import { legacyBlogMetadata } from "@/lib/blogs/legacy-metadata";

export const metadata = legacyBlogMetadata("what-causes-collagen-to-decrease");

export default function LegacyBlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

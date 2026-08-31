import { legacyBlogMetadata } from "@/lib/blogs/legacy-metadata";

export const metadata = legacyBlogMetadata("unlocking-radiant-skin-what-is-rf-micro-needling-and-how-it-transforms-your-complexion");

export default function LegacyBlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

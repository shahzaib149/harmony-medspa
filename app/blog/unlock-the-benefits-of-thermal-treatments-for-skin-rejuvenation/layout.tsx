import { legacyBlogMetadata } from "@/lib/blogs/legacy-metadata";

export const metadata = legacyBlogMetadata("unlock-the-benefits-of-thermal-treatments-for-skin-rejuvenation");

export default function LegacyBlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

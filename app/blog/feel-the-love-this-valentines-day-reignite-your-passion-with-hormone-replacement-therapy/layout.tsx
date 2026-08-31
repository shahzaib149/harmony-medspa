import { legacyBlogMetadata } from "@/lib/blogs/legacy-metadata";

export const metadata = legacyBlogMetadata("feel-the-love-this-valentines-day-reignite-your-passion-with-hormone-replacement-therapy");

export default function LegacyBlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

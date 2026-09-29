import { googleTagBootstrap } from "@/lib/analytics";

export default function GoogleAnalytics() {
  // Next 16 beforeInteractive queues inline code behind its runtime. A native
  // head script establishes the queue during HTML parsing, before hydration.
  // The helper then appends ONE async loader, avoiding React 19 script hoisting.
  return <script id="google-gtag-init" dangerouslySetInnerHTML={{ __html: googleTagBootstrap() }} />;
}

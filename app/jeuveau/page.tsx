export const metadata = { title: "Jeuveau" };

import { permanentRedirect } from "next/navigation";

export default function JeuveauRedirectPage() {
  permanentRedirect("/blog/how-jeuveau-fits-into-your-anti-aging-skincare-routine");
}

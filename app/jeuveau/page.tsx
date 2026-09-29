export const metadata = { title: "Jeuveau" };

import { permanentRedirect } from "next/navigation";

export default function JeuveauRedirectPage() {
  permanentRedirect("/blog/How-Jeuveau-Fits-Into-Your-Anti-Aging-Skincare-Routine");
}

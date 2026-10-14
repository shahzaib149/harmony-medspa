import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { MenuImage } from "@/lib/data/pricing";

/** Only the menu graphics whose files are present in public/ (see PRICE_MENU_IMAGES). */
export function availableMenuImages(images: MenuImage[]) {
  return images.filter((image) => fs.existsSync(path.join(process.cwd(), "public", image.src)));
}

export default function MenuImages({ images, className = "" }: { images: MenuImage[]; className?: string }) {
  const available = availableMenuImages(images);
  if (!available.length) return null;
  return (
    <div className={`grid gap-[22px] ${available.length > 1 ? "grid-cols-2 max-[720px]:grid-cols-1" : ""} ${className}`}>
      {available.map((image) => (
        <a key={image.src} href={image.src} target="_blank" rel="noopener noreferrer" className="block rounded-[16px] overflow-hidden [border:1px_solid_#ece0c8] bg-[#fff]">
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 720px) 100vw, 580px" className="block w-full h-auto" />
        </a>
      ))}
    </div>
  );
}

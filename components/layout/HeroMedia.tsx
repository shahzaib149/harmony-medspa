import Image from "next/image";
import { HERO_IMAGES } from "@/lib/data/heroImages";

/**
 * Photography and category line for a page's dark title band. Render it as the first
 * child of a hero section that carries the `has-media` class; the section's CSS places
 * the photo on the right and fades it into the band so the gold title stays readable.
 * The `full` variant (for centred bands with the `has-media-full` class) spreads the
 * photo across the whole band under a dark wash and leaves the band's own copy alone.
 */
export default function HeroMedia({ path, variant = "split" }: { path: string; variant?: "split" | "full" }) {
  const hero = HERO_IMAGES[path];
  if (!hero) return null;

  return (
    <>
      <div className={variant === "full" ? "hero-media is-full" : "hero-media"} aria-hidden="true">
        <Image
          src={hero.image}
          alt=""
          fill
          preload
          placeholder="blur"
          sizes={variant === "full" ? "100vw" : "(max-width: 720px) 100vw, 62vw"}
          style={hero.position ? { objectPosition: hero.position } : undefined}
        />
      </div>
      {variant === "split" ? <p className="hero-eyebrow">{hero.eyebrow}</p> : null}
    </>
  );
}

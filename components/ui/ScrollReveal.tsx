"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Containers whose direct children are revealed as separate blocks. */
const BLOCK_PARENTS = "main section > *, main article > *, main aside > *";
const SKIP = "[class*='hero'], .has-media, header, nav, form *, [data-no-reveal], [data-no-reveal] *";
const MAX_BLOCKS = 220;
const STAGGER_MS = 80;
const MAX_STAGGER_MS = 320;

function isAnimatable(el: HTMLElement): boolean {
  if (el.matches(SKIP) || el.closest("[data-no-reveal]")) return false;
  if (!el.offsetParent && getComputedStyle(el).position !== "fixed") return false;
  const style = getComputedStyle(el);
  if (style.position === "fixed" || style.position === "absolute" || style.position === "sticky") return false;
  // Leave elements that already move or fade on their own alone.
  if (style.transform !== "none" || style.translate !== "none" || style.animationName !== "none") return false;
  if (Number(style.opacity) < 1 || style.display === "contents") return false;
  return el.offsetHeight > 0;
}

/**
 * Picks the blocks to reveal: children of sections, articles and sidebars, preferring
 * the innermost level, and splitting card grids into their cards so they can stagger.
 */
function collectBlocks(): HTMLElement[] {
  const all = Array.from(document.querySelectorAll<HTMLElement>(BLOCK_PARENTS));
  const set = new Set(all);
  const hasInnerBlock = new Set<HTMLElement>();
  for (const el of all) {
    for (let parent = el.parentElement; parent && parent.tagName !== "MAIN"; parent = parent.parentElement) {
      if (set.has(parent)) hasInnerBlock.add(parent);
    }
  }
  const leaves = all.filter((el) => !hasInnerBlock.has(el));

  const blocks: HTMLElement[] = [];
  for (const el of leaves) {
    const display = getComputedStyle(el).display;
    const kids = Array.from(el.children) as HTMLElement[];
    const isCardGrid = (display === "grid" || display === "flex") && kids.length >= 3 && kids.length <= 12;
    blocks.push(...(isCardGrid ? kids : [el]));
  }
  return blocks.filter(isAnimatable).slice(0, MAX_BLOCKS);
}

/**
 * Fades and lifts content into place as it scrolls into view. Only blocks that start
 * below the fold are hidden, so nothing visible on load ever flashes, and without
 * JavaScript (or with reduced motion) everything renders normally.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | undefined;
    const pending = new Set<HTMLElement>();

    const finish = (el: HTMLElement) => {
      el.classList.remove("reveal-pending", "reveal-in");
      el.style.removeProperty("--reveal-delay");
    };

    const frame = window.requestAnimationFrame(() => {
      const fold = window.innerHeight * 0.95;
      const blocks = collectBlocks().filter((el) => el.getBoundingClientRect().top > fold);
      if (!blocks.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          const entering = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target as HTMLElement);
          entering.forEach((el, index) => {
            const delay = Math.min(index * STAGGER_MS, MAX_STAGGER_MS);
            observer?.unobserve(el);
            pending.delete(el);
            el.style.setProperty("--reveal-delay", `${delay}ms`);
            el.classList.add("reveal-in");
            // Hand the element back to its own styles once the transition has settled.
            window.setTimeout(() => finish(el), delay + 900);
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0 }
      );

      for (const el of blocks) {
        el.classList.add("reveal-pending");
        pending.add(el);
        observer.observe(el);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      pending.forEach(finish);
    };
  }, [pathname]);

  return null;
}

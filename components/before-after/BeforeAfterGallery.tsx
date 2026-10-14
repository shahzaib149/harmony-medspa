"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import {
  BEFORE_AFTER_CASES,
  BEFORE_AFTER_CATEGORIES,
  beforeAfterImages,
  type BeforeAfterCategoryId,
} from "@/lib/data/beforeAfter";

type Filter = "all" | BeforeAfterCategoryId;

const PAGE_SIZE = 9;
const categoryById = new Map(BEFORE_AFTER_CATEGORIES.map((category) => [category.id, category]));

function isCategory(value: string): value is BeforeAfterCategoryId {
  return categoryById.has(value as BeforeAfterCategoryId);
}

/** Filterable grid of comparison sliders. A `#<category>` hash opens that category. */
export default function BeforeAfterGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    const fromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (isCategory(hash)) {
        setFilter(hash);
        setVisible(PAGE_SIZE);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const choose = (next: Filter) => {
    setFilter(next);
    setVisible(PAGE_SIZE);
    window.history.replaceState(null, "", next === "all" ? window.location.pathname : `#${next}`);
  };

  const cases = filter === "all" ? BEFORE_AFTER_CASES : BEFORE_AFTER_CASES.filter((item) => item.category === filter);
  const shown = cases.slice(0, visible);
  const active = filter === "all" ? undefined : categoryById.get(filter);

  return (
    <div className="ba-gallery">
      <div className="ba-filters" role="group" aria-label="Filter results by treatment">
        <button type="button" className="ba-chip" aria-pressed={filter === "all"} onClick={() => choose("all")}>
          All results <span>{BEFORE_AFTER_CASES.length}</span>
        </button>
        {BEFORE_AFTER_CATEGORIES.map((category) => (
          <button
            type="button"
            key={category.id}
            className="ba-chip"
            aria-pressed={filter === category.id}
            onClick={() => choose(category.id)}
          >
            {category.label} <span>{BEFORE_AFTER_CASES.filter((item) => item.category === category.id).length}</span>
          </button>
        ))}
      </div>

      <p className="ba-gallery-note" aria-live="polite">
        {active ? (
          <>
            {active.description}{" "}
            <Link href={active.href}>Learn about {active.label}</Link>
          </>
        ) : (
          "Drag or swipe across any photo to compare before and after."
        )}
      </p>

      <ul className="ba-grid">
        {shown.map((item) => {
          const category = categoryById.get(item.category)!;
          const images = beforeAfterImages(item);
          return (
            <li key={`${item.category}-${item.id}`} className="ba-card">
              <BeforeAfterSlider
                before={images.before}
                after={images.after}
                width={item.width}
                height={item.height}
                aspectRatio="4 / 5"
                label={`${category.label} result`}
              />
              <div className="ba-card-meta">
                <span>{category.label}</span>
                <Link href={category.href}>View treatment</Link>
              </div>
            </li>
          );
        })}
      </ul>

      {visible < cases.length ? (
        <div className="ba-more">
          <button type="button" className="ba-more-button" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
            Show more results
            <span>
              {shown.length} of {cases.length}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { imageSourceForSite } from "@/lib/blogs/types";

export default function ArticleImage({
  url,
  alt,
  className,
  loading,
}: {
  url: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const source = imageSourceForSite(url);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [source]);

  if (failed) {
    return (
      <div className="grid min-h-[212px] place-items-center bg-[#f3f0e9] px-6 text-center text-sm text-[#6b6257]" role="status">
        This article image is temporarily unavailable.
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={source} alt={alt} loading={loading} onError={() => setFailed(true)} />
  );
}

"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/mdx";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        Contents
      </p>
      <ul className="mt-4 space-y-2 border-l border-hairline">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 py-0.5 pl-3 text-[13px] leading-5 transition-colors ${
                active === item.id
                  ? "border-accent text-accent"
                  : "border-transparent text-zinc-500 hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

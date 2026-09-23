"use client";

import { useMemo, useState } from "react";
import { PostCard, type PostMeta } from "./post-card";

export function BlogBrowser({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTag && !post.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center border border-hairline focus-within:border-accent">
          <span className="pl-3 font-mono text-xs text-zinc-400">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="w-full bg-transparent px-3 py-2.5 font-mono text-sm outline-none placeholder:text-zinc-400"
          />
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Filter:
            </span>
            <TagChip
              label="all"
              active={activeTag === null}
              onClick={() => setActiveTag(null)}
            />
            {tags.map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-hairline">
        {filtered.length === 0 ? (
          <p className="py-12 text-center font-mono text-sm text-zinc-500">
            No posts match that query.
          </p>
        ) : (
          filtered.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))
        )}
      </div>

      <p className="mt-4 text-right font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
        {filtered.length} / {posts.length} entries
      </p>
    </div>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
        active
          ? "border-accent bg-accent text-white dark:text-black"
          : "border-hairline text-zinc-500 hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}

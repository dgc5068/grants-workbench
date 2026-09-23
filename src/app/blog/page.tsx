import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { toPostMeta } from "@/components/post-card";
import { BlogBrowser } from "@/components/blog-browser";

export const metadata: Metadata = {
  title: "Blog",
  description: "All project write-ups and field notes.",
};

export default function BlogPage() {
  const posts = getAllPosts().map(toPostMeta);
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <header className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          Archive
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Build log
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
          Every project write-up, experiment, and postmortem. Search by keyword
          or filter by tag.
        </p>
      </header>
      <BlogBrowser posts={posts} tags={tags} />
    </div>
  );
}

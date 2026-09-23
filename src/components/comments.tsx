"use client";

import Giscus from "@giscus/react";
import { useIsDark } from "@/lib/use-dark";

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export function Comments() {
  const dark = useIsDark();

  if (!repo || !repoId || !category || !categoryId) {
    return (
      <section className="mt-16 border border-dashed border-hairline p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Comments — not configured
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Comments are powered by{" "}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4"
          >
            Giscus
          </a>
          , which stores discussions on GitHub. To enable them: enable
          Discussions on the repo, install the Giscus app, then set{" "}
          <code className="font-mono text-[0.9em]">
            NEXT_PUBLIC_GISCUS_REPO
          </code>
          ,{" "}
          <code className="font-mono text-[0.9em]">
            NEXT_PUBLIC_GISCUS_REPO_ID
          </code>
          ,{" "}
          <code className="font-mono text-[0.9em]">
            NEXT_PUBLIC_GISCUS_CATEGORY
          </code>
          , and{" "}
          <code className="font-mono text-[0.9em]">
            NEXT_PUBLIC_GISCUS_CATEGORY_ID
          </code>{" "}
          in <code className="font-mono text-[0.9em]">.env.local</code> (see{" "}
          <code className="font-mono text-[0.9em]">.env.example</code>).
        </p>
      </section>
    );
  }

  return (
    <section className="mt-16 border-t border-hairline pt-10">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        Comments
      </p>
      <Giscus
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={dark ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </section>
  );
}

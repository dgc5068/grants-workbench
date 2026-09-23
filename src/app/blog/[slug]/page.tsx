import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatDate,
  getAllPosts,
  getPostBySlug,
  getTableOfContents,
} from "@/lib/mdx";
import { MdxContent } from "@/components/mdx-content";
import { TableOfContents } from "@/components/toc";
import { Comments } from "@/components/comments";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [site.author],
      tags: post.tags,
      url: `/blog/${post.slug}`,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.summary,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = getTableOfContents(post.content);

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <Link
        href="/blog"
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-accent"
      >
        ← All entries
      </Link>

      <header className="mt-6 border-b border-hairline pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
          {post.draft && (
            <>
              <span aria-hidden>·</span>
              <span className="border border-amber-400 px-1.5 py-0.5 text-amber-600 dark:text-amber-400">
                Draft
              </span>
            </>
          )}
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
          {post.summary}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-hairline px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-10 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_220px]">
        <article className="prose max-w-none dark:prose-invert">
          <MdxContent source={post.content} />
        </article>
        <aside className="mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>

      <Comments />
    </div>
  );
}

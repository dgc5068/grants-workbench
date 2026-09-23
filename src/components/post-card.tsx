import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/mdx";
import { formatDate } from "@/lib/format";

export type PostMeta = Omit<Post, "content">;

export function toPostMeta(post: Post): PostMeta {
  const { slug, title, publishedAt, summary, tags, draft, readingTime, image } =
    post;
  return { slug, title, publishedAt, summary, tags, draft, readingTime, image };
}

/** Card/hero image. Parent must be `relative` with a fixed aspect. */
export function PostImage({
  src,
  alt = "",
  className,
  sizes = "160px",
}: {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
}) {
  const cls = `h-full w-full object-cover ${className ?? ""}`;
  if (src.endsWith(".svg")) {
    // next/image skips optimization for SVGs; render directly
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={cls} />;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} className={cls} />;
}

export function PostCard({ post, index }: { post: PostMeta; index?: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-b border-hairline py-5 transition-colors"
    >
      <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-5">
        {index !== undefined && (
          <span className="w-8 shrink-0 self-start pt-1.5 font-mono text-[11px] text-zinc-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-[17px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
              {post.title}
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">
              {formatDate(post.publishedAt)} · {post.readingTime}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {post.summary}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
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
        </div>
        {post.image && (
          <span className="order-first block w-full shrink-0 border border-hairline bg-white p-1 dark:bg-[#111110] sm:order-0 sm:w-56">
            <span className="relative block aspect-video overflow-hidden">
              <PostImage
                src={post.image}
                alt=""
                sizes="224px"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </span>
          </span>
        )}
        <span className="shrink-0 font-mono text-sm text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-accent">
          →
        </span>
      </div>
    </Link>
  );
}

export function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-hairline bg-background transition-colors hover:border-accent"
    >
      {post.image && (
        <span className="relative block aspect-video overflow-hidden border-b border-hairline bg-white dark:bg-[#111110]">
          <PostImage
            src={post.image}
            alt={post.title}
            sizes="(min-width: 1024px) 360px, 100vw"
          />
        </span>
      )}
      <span className="block p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {formatDate(post.publishedAt)} · {post.readingTime}
        </span>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <span className="mt-2 line-clamp-3 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {post.summary}
        </span>
      </span>
    </Link>
  );
}

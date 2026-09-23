import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { FeaturedPostCard, PostCard, toPostMeta } from "@/components/post-card";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0] ? toPostMeta(posts[0]) : null;
  const recent = posts.slice(1, 5).map(toPostMeta);

  return (
    <div>
      {/* Hero — blueprint grid + engineering title block */}
      <section className="bg-blueprint border-b border-hairline">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14">
            <div>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {site.name}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                I&apos;m {site.author}, an engineering student documenting what
                I design, create, and break. I created Grant&apos;s Workbench to
                stand out in a world of ATS-friendly resumes and LinkedIn
                connections.
              </p>

              <dl className="mt-10 inline-block border border-hairline bg-background font-mono text-[12px]">
                {[
                  ["project", "grant's workbench"],
                  ["author", "Grant — UVU Engineering"],
                  ["discipline", "Mechanical / Electrical"],
                  ["status", "97 Credits Complete"],
                  ["rev", "2026.a"],
                ].map(([k, v], i, arr) => (
                  <div
                    key={k}
                    className={`grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] ${
                      i < arr.length - 1 ? "border-b border-hairline" : ""
                    }`}
                  >
                    <dt className="border-r border-hairline px-3 py-1.5 uppercase tracking-[0.15em] text-zinc-500">
                      {k}
                    </dt>
                    <dd className="px-3 py-1.5">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {featured && (
              <div className="mt-12 lg:mt-0">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                  Latest entry
                </p>
                <FeaturedPostCard post={featured} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
            01 — Recent entries
          </h2>
          <Link
            href="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent hover:underline underline-offset-4"
          >
            All posts →
          </Link>
        </div>
        <div className="mt-6 border-t border-hairline">
          {recent.length === 0 ? (
            <p className="py-10 font-mono text-sm text-zinc-500">
              Nothing published yet — check back soon.
            </p>
          ) : (
            recent.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))
          )}
        </div>
      </section>

      {/* Links / contact */}
      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="border border-hairline p-6 sm:p-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
            02 — Get in touch
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Recruiters, collaborators, and fellow builders — I&apos;m happy to
            talk about any project here, or about internships and co-ops.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              ["LinkedIn", site.links.linkedin],
              ["Email", `mailto:${site.email}`],
              ["RSS feed", "/feed.xml"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

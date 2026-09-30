import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { EmailButton } from "@/components/copy-email";
import { getAllPosts } from "@/lib/mdx";
import { FeaturedPostCard, PostCard, toPostMeta } from "@/components/post-card";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0] ? toPostMeta(posts[0]) : null;
  const recent = posts.slice(1, 5).map(toPostMeta);
  const hasResumePdf = fs.existsSync(
    path.join(process.cwd(), "public", "resume.pdf"),
  );

  return (
    <div>
      {/* Hero — blueprint grid + engineering title block */}
      <section className="bg-blueprint border-b border-hairline">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:gap-14">
            <div>
              <h1 className="max-w-2xl">
                <Image
                  src="/grants-workbench-logo.png"
                  alt={site.name}
                  width={2054}
                  height={292}
                  priority
                  className="h-auto w-full dark:invert"
                />
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                I&apos;m {site.author}, an engineering student documenting what
                I design, create, and break. I created Grant&apos;s Workbench to
                stand out more personally in a world of ATS-friendly resumes and
                embellished LinkedIn profiles.
              </p>

              <dl className="mt-10 inline-block border border-hairline bg-background font-mono text-[12px] shadow-[8px_8px_0_0_color-mix(in_srgb,var(--foreground)_18%,transparent)] dark:shadow-[8px_8px_0_0_rgba(0,0,0,0.55)]">
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
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground">
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
            <EmailButton
              email={site.email}
              className="border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
            />
            {hasResumePdf && (
              <a
                href="/resume.pdf"
                download="Grant Clark — Resume.pdf"
                className="inline-flex items-center gap-2 border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
              >
                ATS-Friendly Resume PDF
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

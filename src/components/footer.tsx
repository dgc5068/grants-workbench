import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          © {new Date().getFullYear()} {site.author} — {site.name}
        </p>
        <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.2em]">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            Email
          </a>
          <a
            href="/feed.xml"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}

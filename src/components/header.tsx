import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center border border-foreground font-mono text-[11px] font-semibold tracking-tight transition-colors group-hover:border-accent group-hover:text-accent">
            GW
          </span>
          <span className="font-mono text-sm font-medium tracking-tight">
            {site.name}
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="px-2 py-1 font-mono text-[12px] uppercase tracking-[0.15em] text-zinc-600 transition-colors hover:text-accent dark:text-zinc-400"
          >
            Work
          </Link>
          <Link
            href="/blog"
            className="px-2 py-1 font-mono text-[12px] uppercase tracking-[0.15em] text-zinc-600 transition-colors hover:text-accent dark:text-zinc-400"
          >
            Blog
          </Link>
          <a
            href="/feed.xml"
            className="px-2 py-1 font-mono text-[12px] uppercase tracking-[0.15em] text-zinc-600 transition-colors hover:text-accent dark:text-zinc-400"
          >
            RSS
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

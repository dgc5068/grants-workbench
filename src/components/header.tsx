import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex origin-left items-center gap-2.5 transition-transform duration-200 hover:scale-110"
        >
          <span className="flex h-7 w-7 items-center justify-center overflow-hidden border border-foreground">
            <Image
              src="/gw-square-logo.png"
              alt="GW"
              width={171}
              height={171}
              className="h-full w-full object-contain dark:invert"
            />
          </span>
          <Image
            src="/grants-workbench-logo.png"
            alt={site.name}
            width={2054}
            height={292}
            className="h-5 w-auto dark:invert"
          />
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

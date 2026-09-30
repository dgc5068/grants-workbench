import fs from "node:fs";
import path from "node:path";
import { EmailButton } from "@/components/copy-email";
import { site } from "@/lib/site";

export function Footer() {
  const hasResumePdf = fs.existsSync(
    path.join(process.cwd(), "public", "resume.pdf"),
  );

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
          <EmailButton
            email={site.email}
            className="text-zinc-500 transition-colors hover:text-accent"
          />
          <a
            href="/feed.xml"
            className="text-zinc-500 transition-colors hover:text-accent"
          >
            RSS
          </a>
          {hasResumePdf && (
            <a
              href="/resume.pdf"
              download="Grant Clark — Resume.pdf"
              className="text-zinc-500 transition-colors hover:text-accent"
            >
              ATS-Friendly Resume PDF
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

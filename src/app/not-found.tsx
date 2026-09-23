import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-5 py-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
        Error 404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        Part not found
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
        This drawing number doesn&apos;t exist in the archive. It may have been
        renamed, moved, or never made it off the napkin.
      </p>
      <Link
        href="/"
        className="mt-8 border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
      >
        ← Back to the workbench
      </Link>
    </div>
  );
}

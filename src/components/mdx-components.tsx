import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { CodeBlock } from "./code-block";

type CalloutType = "info" | "warning" | "tip";

const CALLOUT_STYLES: Record<
  CalloutType,
  { label: string; border: string; chip: string; bg: string }
> = {
  info: {
    label: "Note",
    border: "border-blue-300 dark:border-blue-900",
    chip: "text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-900",
    bg: "bg-blue-50/60 dark:bg-blue-950/30",
  },
  warning: {
    label: "Caution",
    border: "border-amber-300 dark:border-amber-900",
    chip: "text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-900",
    bg: "bg-amber-50/60 dark:bg-amber-950/30",
  },
  tip: {
    label: "Tip",
    border: "border-emerald-300 dark:border-emerald-900",
    chip: "text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-900",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/30",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.info;
  return (
    <aside className={`not-prose my-6 border ${s.border} ${s.bg} p-4`}>
      <span
        className={`inline-block border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${s.chip}`}
      >
        {title ?? s.label}
      </span>
      <div className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300 [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

function MdxImage({
  src,
  alt,
  width,
  height,
  caption,
  ...rest
}: ComponentProps<"img"> & { caption?: string }) {
  const source = typeof src === "string" ? src : "";
  const w = Number(width) > 0 ? Number(width) : 1600;
  const h = Number(height) > 0 ? Number(height) : 900;
  const isSvg = source.endsWith(".svg");

  const image = isSvg ? (
    // next/image skips optimization for SVGs; render directly
    // eslint-disable-next-line @next/next/no-img-element
    <img src={source} alt={alt ?? ""} className="h-auto w-full" {...rest} />
  ) : (
    <Image
      src={source}
      alt={alt ?? ""}
      width={w}
      height={h}
      className="h-auto w-full"
    />
  );

  return (
    <span className="not-prose my-8 block">
      <span className="block border border-hairline bg-white p-2 dark:bg-[#111110]">
        {image}
      </span>
      {(caption || alt) && (
        <span className="mt-2 block text-center font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
          {caption ?? alt}
        </span>
      )}
    </span>
  );
}

function MdxLink({ href, children, ...rest }: ComponentProps<"a">) {
  const external = typeof href === "string" && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  pre: CodeBlock,
  img: MdxImage,
  a: MdxLink,
  Callout,
  Image: MdxImage,
};

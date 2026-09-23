"use client";

import { useRef, useState, type ComponentProps } from "react";

/**
 * Replaces <pre> in rendered MDX. Adds a drawing-style title bar with the
 * language label and a copy button that pulls text straight from the DOM,
 * so it works with whatever rehype-pretty-code emits.
 */
export function CodeBlock(props: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const { children, className, ...rest } = props;
  const language =
    (rest as Record<string, unknown>)["data-language"] as string | undefined;

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard API unavailable (permissions, non-secure context)
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="not-prose my-6 border border-hairline bg-[#fbfbf9] dark:bg-[#111110]">
      <div className="flex items-center justify-between border-b border-hairline px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {language ?? "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-accent"
          aria-label="Copy code to clipboard"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre
        ref={ref}
        {...rest}
        className={`overflow-x-auto p-4 font-mono text-[13px] leading-6 ${className ?? ""}`}
      >
        {children}
      </pre>
    </div>
  );
}

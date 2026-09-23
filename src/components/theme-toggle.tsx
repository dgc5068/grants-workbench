"use client";

import { useIsDark } from "@/lib/use-dark";

export function ThemeToggle() {
  const dark = useIsDark();

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-8 w-8 items-center justify-center border border-hairline font-mono text-xs text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-300/40 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/[0.15] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
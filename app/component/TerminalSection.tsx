"use client";

import { useState, type ReactNode } from "react";

type WindowState = "open" | "minimized" | "closed";

export function TerminalSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [state, setState] = useState<WindowState>("open");

  // completely removed
  if (state === "closed") return null;

  const isOpen = state === "open";
  const isMinimized = state === "minimized";

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300">
      
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          
          {/* mac buttons */}
          <div className="flex items-center gap-2">
            {/* CLOSE */}
            <button
              onClick={() => setState("closed")}
              className="h-2.5 w-2.5 rounded-full bg-red-500/80 hover:scale-110 transition"
            />

            {/* MINIMIZE */}
            <button
              onClick={() =>
                setState((prev) =>
                  prev === "minimized" ? "open" : "minimized"
                )
              }
              className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 hover:scale-110 transition"
            />

            {/* TOGGLE */}
            <button
              onClick={() =>
                setState((prev) => (prev === "open" ? "minimized" : "open"))
              }
              className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 hover:scale-110 transition"
            />
          </div>

          <div className="font-mono text-xs text-zinc-300">
            <span className="text-zinc-100">$</span> {title}
          </div>
        </div>

        {subtitle ? (
          <div className="hidden sm:block font-mono text-[11px] text-zinc-400">
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* CONTENT */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {!isMinimized && (
          <div className="px-4 py-4 font-mono">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
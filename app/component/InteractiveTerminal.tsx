"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TerminalSection } from "./TerminalSection";

export type TerminalView =
  | "home"
  | "systems"
  | "science"
  | "objective"
  | "projects"
  | "blogs"
  | "devto"
  | "prs"
  | "tweets"
  | "about"
  | "activity";

type HistoryLine =
  | { kind: "input"; text: string }
  | { kind: "output"; text: string }
  | { kind: "hint"; text: string };

function normalize(cmd: string) {
  return cmd.trim().replace(/\s+/g, " ");
}

function isRoute(cmd: string) {
  return cmd.startsWith("/");
}

export function InteractiveTerminal({
  onRoute,
}: {
  onRoute: (view: TerminalView) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryLine[]>([
    { kind: "output", text: "type `/help` to see commands" },
  ]);
  const cmdIdxRef = useRef<number | null>(null);

  const commands = useMemo(() => {
    const list: Array<{ cmd: string; desc: string; view?: TerminalView }> = [
      { cmd: "/home", desc: "overview", view: "home" },
      { cmd: "/systems", desc: "system snapshot", view: "systems" },
      { cmd: "/science", desc: "science mindset", view: "science" },
      { cmd: "/objective", desc: "focus areas", view: "objective" },
      { cmd: "/projects", desc: "projects list", view: "projects" },
      { cmd: "/blogs", desc: "blog notes (local)", view: "blogs" },
      { cmd: "/devto", desc: "dev.to posts (live)", view: "devto" },
      { cmd: "/prs", desc: "pull requests (live)", view: "prs" },
      { cmd: "/tweets", desc: "selected tweets", view: "tweets" },
      { cmd: "/about", desc: "resume / education", view: "about" },
      { cmd: "/activity", desc: "GitHub graph", view: "activity" },
      { cmd: "clear", desc: "clear terminal" },
      { cmd: "/help", desc: "show commands" },
    ];
    return list;
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    // show help once on load (feels like a real terminal boot)
    setHistory((h) =>
      h.length === 1 ? [...h, { kind: "output", text: "boot: ready" }] : h
    );
  }, []);

  useEffect(() => {
    // render help once after boot
    printHelp();
    // we intentionally run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function printHelp() {
    setHistory((h) => [
      ...h,
      { kind: "output", text: "commands:" },
      ...commands.map((c) => ({
        kind: "output" as const,
        text: `${c.cmd.padEnd(10, " ")}  ${c.desc}`,
      })),
    ]);
  }

  function run(raw: string) {
    const cmd = normalize(raw);
    if (!cmd) return;

    setHistory((h) => [...h, { kind: "input", text: cmd }]);
    setCmdHistory((prev) => [...prev, cmd]);
    cmdIdxRef.current = null;

    if (cmd === "clear") {
      setHistory([{ kind: "output", text: "cleared" }]);
      return;
    }

    if (cmd === "/help") {
      printHelp();
      return;
    }

    if (isRoute(cmd)) {
      const found = commands.find((c) => c.cmd === cmd && c.view);
      if (!found?.view) {
        setHistory((h) => [
          ...h,
          { kind: "output", text: `unknown route: ${cmd}` },
          { kind: "hint", text: "try `/help`" },
        ]);
        return;
      }
      onRoute(found.view);
      setHistory((h) => [
        ...h,
        { kind: "output", text: `navigated → ${found.cmd}` },
      ]);
      return;
    }

    setHistory((h) => [
      ...h,
      { kind: "output", text: `unknown command: ${cmd}` },
      { kind: "hint", text: "try `/help`" },
    ]);
  }

  return (
    <TerminalSection title="terminal" subtitle="type a route like /projects">
      <div className="space-y-3">
        <div className="max-h-56 space-y-1 overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-xs">
          {history.slice(-80).map((line, idx) => {
            if (line.kind === "input") {
              return (
                <div key={idx} className="text-zinc-200">
                  <span className="text-emerald-400">$</span> {line.text}
                </div>
              );
            }
            if (line.kind === "hint") {
              return (
                <div key={idx} className="text-zinc-500">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={idx} className="text-zinc-300">
                {line.text}
              </div>
            );
          })}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
          }}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2"
        >
          <span className="font-mono text-xs text-emerald-400">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                if (!cmdHistory.length) return;
                const idx = cmdIdxRef.current;
                const next = idx === null ? cmdHistory.length - 1 : Math.max(0, idx - 1);
                cmdIdxRef.current = next;
                setValue(cmdHistory[next] ?? "");
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!cmdHistory.length) return;
                const idx = cmdIdxRef.current;
                if (idx === null) return;
                const next = Math.min(cmdHistory.length, idx + 1);
                const nextVal = cmdHistory[next];
                cmdIdxRef.current = next === cmdHistory.length ? null : next;
                setValue(nextVal ?? "");
              }
              if (e.key === "Escape") {
                setValue("");
                cmdIdxRef.current = null;
              }
            }}
            className="w-full bg-transparent font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
            placeholder="/projects"
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
          />
          <button
            type="submit"
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-200 hover:bg-white/10"
          >
            run
          </button>
        </form>
      </div>
    </TerminalSection>
  );
}


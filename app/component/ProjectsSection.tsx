"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { TerminalSection } from "./TerminalSection";

export type ProjectItem = {
  name: string;
  oneLiner: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  previewImageUrl?: string;
  highlights?: string[];
};

const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    name: "Nebula Notes",
    oneLiner: "AI-assisted notes + summaries + daily learning schedule",
    description:
      "A minimal note-taking app with summarization and structured planning. Designed to stay fast, searchable, and easy to extend.",
    stack: ["Next.js", "TypeScript", "Tailwind", "LLM API"],
    liveUrl: "https://nebulanotes.io",
    repoUrl: "https://github.com/vishaldevsx/nebula-notes",
    previewImageUrl:
      "https://api.microlink.io/?url=https://nebulanotes.io&screenshot=true&meta=false&embed=screenshot.url",
    highlights: ["clean UX", "fast iteration", "practical AI features"],
  },
  {
    name: "PixelTrail",
    oneLiner: "Community platform for pixel-art challenges",
    description:
      "A creator-focused platform to showcase artwork, collaborate on challenges, and build small social mechanics around creativity.",
    stack: ["React", "Firebase", "Tailwind"],
    liveUrl: "https://pixeltrail.art",
    repoUrl: "https://github.com/vishaldevsx/pixeltrail",
    previewImageUrl:
      "https://api.microlink.io/?url=https://pixeltrail.art&screenshot=true&meta=false&embed=screenshot.url",
    highlights: ["community features", "auth + data rules", "responsive UI"],
  },
  {
    name: "EcoQuest",
    oneLiner: "Learning game: climate, renewables, sustainability",
    description:
      "A web game that turns climate concepts into interactive quests. Built for smooth performance and quick content iteration.",
    stack: ["Next.js", "Phaser.js", "TypeScript"],
    liveUrl: "https://ecoquest.world",
    repoUrl: "https://github.com/vishaldevsx/ecoquest",
    previewImageUrl:
      "https://api.microlink.io/?url=https://ecoquest.world&screenshot=true&meta=false&embed=screenshot.url",
    highlights: ["performance-focused", "interactive learning", "content-driven"],
  },
];

type PinnedRepo = {
  name: string;
  nameWithOwner: string;
  url: string;
  description: string | null;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
  updatedAt: string;
};

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300">
      {children}
    </span>
  );
}

export function ProjectsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pinned, setPinned] = useState<PinnedRepo[]>([]);

  const projectsFromPinned = useMemo<ProjectItem[]>(() => {
    return pinned.map((r) => {
      const stack = r.primaryLanguage?.name ? [r.primaryLanguage.name] : [];
      return {
        name: r.nameWithOwner,
        oneLiner: `${r.stargazerCount}★ • ${r.forkCount} forks`,
        description: r.description ?? "Pinned repository",
        stack,
        repoUrl: r.url,
        liveUrl: r.homepageUrl ?? undefined,
        previewImageUrl: r.homepageUrl
          ? `https://api.microlink.io/?url=${encodeURIComponent(
              r.homepageUrl
            )}&screenshot=true&meta=false&embed=screenshot.url`
          : undefined,
        highlights: [
          `updated ${new Date(r.updatedAt).toLocaleDateString()}`,
          r.primaryLanguage?.name ? `primary: ${r.primaryLanguage.name}` : "primary: —",
        ],
      };
    });
  }, [pinned]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/github/pinned", { cache: "no-store" });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(body?.error ?? `Failed to load pinned repos (${res.status})`);
        }
        const data = (await res.json()) as { repos?: PinnedRepo[] };
        if (!cancelled) setPinned(Array.isArray(data.repos) ? data.repos : []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load pinned repos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const list = projectsFromPinned.length ? projectsFromPinned : FALLBACK_PROJECTS;

  return (
    <section id="projects" className="scroll-mt-24">
      <TerminalSection title="/projects" subtitle="GitHub pinned (preferred) → fallback list">
        <div className="space-y-4">
          <div className="text-xs text-zinc-400">
            Uses your GitHub pinned repos when `GITHUB_TOKEN` is set; otherwise shows a fallback list.
          </div>

          {loading ? <div className="text-sm text-zinc-400">loading pinned…</div> : null}
          {error ? (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
              {error}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            {list.map((p) => (
              <div
                key={p.name}
                className="group rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                {p.previewImageUrl ? (
                  <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={p.previewImageUrl}
                      alt={`${p.name} preview`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      unoptimized
                    />
                  </div>
                ) : null}

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-zinc-100">
                        {p.name}
                      </div>
                      <div className="text-xs text-zinc-400">{p.oneLiner}</div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-zinc-200/90">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>

                  {p.highlights?.length ? (
                    <ul className="mt-2 grid gap-1 text-xs text-zinc-300/90">
                      {p.highlights.slice(0, 3).map((h) => (
                        <li key={h}>
                          <span className="text-emerald-400">+</span>{" "}
                          <span className="text-zinc-200">{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-zinc-200 hover:bg-white/10"
                      >
                        open live
                      </a>
                    ) : null}
                    {p.repoUrl ? (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-zinc-200 hover:bg-white/10"
                      >
                        view repo
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TerminalSection>
    </section>
  );
}


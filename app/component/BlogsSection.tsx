"use client";

import { TerminalSection } from "./TerminalSection";

export type BlogItem = {
  title: string;
  date: string;
  summary: string;
  url?: string;
  tags?: string[];
};

const BLOGS: BlogItem[] = [
  {
    title: "Designing APIs that stay stable at scale",
    date: "2026",
    summary:
      "Notes on versioning, idempotency, pagination, error contracts, and how to design endpoints that survive real clients.",
    tags: ["backend", "api", "system-design"],
  },
  {
    title: "Postgres performance: indexes, plans, and practical trade-offs",
    date: "2026",
    summary:
      "A practical checklist for query planning, migrations, and keeping latency predictable as data grows.",
    tags: ["postgres", "performance"],
  },
];

export function BlogsSection() {
  return (
    <section id="blogs" className="scroll-mt-24">
      <TerminalSection title="ls ./blogs" subtitle="writing, notes, systems thinking">
        <div className="space-y-4">
          <div className="text-xs text-zinc-400">
            Add/edit posts in `BLOGS` inside `app/component/BlogsSection.tsx`. You
            can link to Medium, Hashnode, Dev.to, or your own site.
          </div>

          <div className="space-y-3">
            {BLOGS.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-white/10 bg-black/30 p-4"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">
                      {b.url ? (
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {b.title}
                        </a>
                      ) : (
                        b.title
                      )}
                    </div>
                    <div className="text-xs text-zinc-400">{b.date}</div>
                  </div>

                  {b.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {b.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-zinc-200/90">
                  {b.summary}
                </p>

                {b.url ? (
                  <div className="mt-3">
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-zinc-200 hover:bg-white/10"
                    >
                      read post
                    </a>
                  </div>
                ) : (
                  <div className="mt-3 text-xs text-zinc-500">
                    (add a link when you publish)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </TerminalSection>
    </section>
  );
}


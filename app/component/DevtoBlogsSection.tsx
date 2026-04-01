"use client";

import { useEffect, useState } from "react";
import { TerminalSection } from "./TerminalSection";

type DevtoArticle = {
  id: number;
  title: string;
  url: string;
  published_at: string;
  public_reactions_count: number;
  comments_count: number;
  tag_list: string[];
};

const DEVTO_USERNAME = "vishalcsx"; // change to your dev.to username

export function DevtoBlogsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<DevtoArticle[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://dev.to/api/articles?username=${encodeURIComponent(DEVTO_USERNAME)}&per_page=6`
        );
        if (!res.ok) throw new Error(`Dev.to API error (${res.status})`);
        const data = (await res.json()) as DevtoArticle[];
        if (!cancelled) setArticles(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load dev.to posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="devto" className="scroll-mt-24">
      <TerminalSection title="/devto" subtitle="dev.to posts (public API)">
        <div className="space-y-3 text-sm text-zinc-200/90">
          <div className="text-xs text-zinc-500">
            username: <span className="text-zinc-300">{DEVTO_USERNAME}</span>
          </div>

          {loading ? <div className="text-zinc-400">loading…</div> : null}
          {error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          ) : null}

          {!loading && !error ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {articles.length ? (
                articles.map((a) => (
                  <a
                    key={a.id}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 hover:bg-white/5"
                  >
                    <div className="text-sm font-semibold text-zinc-100">
                      {a.title}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-zinc-500">
                      {new Date(a.published_at).toLocaleDateString()}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {a.tag_list?.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-[11px] text-zinc-400">
                      {a.public_reactions_count} reactions • {a.comments_count} comments
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-zinc-400">
                  No posts found. Publish on dev.to and they’ll appear here.
                </div>
              )}
            </div>
          ) : null}
        </div>
      </TerminalSection>
    </section>
  );
}


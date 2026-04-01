"use client";

import { useEffect, useMemo, useState } from "react";
import { TerminalSection } from "./TerminalSection";

type GitHubSearchItem = {
  html_url: string;
  title: string;
  state: "open" | "closed";
  updated_at: string;
  repository_url: string;
  pull_request?: unknown;
};

type GitHubSearchResponse = {
  items: GitHubSearchItem[];
};

const GITHUB_USERNAME = "VishalDevx";

function repoFromApiUrl(repositoryUrl: string) {
  // "https://api.github.com/repos/OWNER/REPO"
  try {
    const u = new URL(repositoryUrl);
    const parts = u.pathname.split("/").filter(Boolean);
    const owner = parts[1];
    const repo = parts[2];
    if (owner && repo) return `${owner}/${repo}`;
  } catch {
    // ignore
  }
  return repositoryUrl;
}

export function GithubPRsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<GitHubSearchItem[]>([]);

  const query = useMemo(() => {
    const q = encodeURIComponent(`author:${GITHUB_USERNAME} type:pr`);
    return `https://api.github.com/search/issues?q=${q}&sort=updated&order=desc&per_page=10`;
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(query, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });
        if (!res.ok) {
          throw new Error(`GitHub API error (${res.status})`);
        }
        const data = (await res.json()) as GitHubSearchResponse;
        if (!cancelled) setItems(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load PRs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <section id="prs" className="scroll-mt-24">
      <TerminalSection title="/prs" subtitle="recent pull requests (GitHub public API)">
        <div className="space-y-3 text-sm text-zinc-200/90">
          <div className="text-xs text-zinc-500">
            source: GitHub search `author:{GITHUB_USERNAME} type:pr` (rate-limited for unauthenticated users).
          </div>

          {loading ? <div className="text-zinc-400">loading…</div> : null}
          {error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          ) : null}

          {!loading && !error ? (
            <div className="space-y-2">
              {items.map((pr) => (
                <a
                  key={pr.html_url}
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/10 bg-black/30 px-3 py-2 hover:bg-white/5"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="text-zinc-100">{pr.title}</div>
                    <div className="font-mono text-[11px] text-zinc-500">
                      {new Date(pr.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                      {repoFromApiUrl(pr.repository_url)}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 ${
                        pr.state === "open"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                          : "border-zinc-500/30 bg-white/5 text-zinc-300"
                      }`}
                    >
                      {pr.state}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </TerminalSection>
    </section>
  );
}


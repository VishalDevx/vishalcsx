"use client";

import { useEffect, useState } from "react";
import { TerminalSection } from "./TerminalSection";

// No API keys: we use Twitter/X oEmbed for *specific tweets*.
// For a full timeline, X requires widgets/scripts and may be blocked by CSP/ad-blockers.
const TWEET_URLS: string[] = [
  // Add tweet URLs here, e.g.
  // "https://x.com/VishalCsx/status/1234567890"
];

type OEmbed = { html: string };

export function TweetsSection() {
  const [embeds, setEmbeds] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const next: Record<string, string> = {};
      for (const url of TWEET_URLS) {
        try {
          const res = await fetch(
            `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true&dnt=true`
          );
          if (!res.ok) continue;
          const data = (await res.json()) as OEmbed;
          if (data?.html) next[url] = data.html;
        } catch {
          // ignore
        }
      }
      if (!cancelled) setEmbeds(next);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="tweets" className="scroll-mt-24">
      <TerminalSection title="/tweets" subtitle="selected tweets (oEmbed, no keys)">
        <div className="space-y-3 text-sm text-zinc-200/90">
          <div className="text-xs text-zinc-500">
            Add tweet links in `TWEET_URLS` inside `app/component/TweetsSection.tsx`.
          </div>

          {TWEET_URLS.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-zinc-400">
              No tweets configured yet.
            </div>
          ) : (
            <div className="grid gap-3">
              {TWEET_URLS.map((url) => (
                <div key={url} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  {embeds[url] ? (
                    <div
                      className="prose prose-invert max-w-none prose-a:text-zinc-200"
                      dangerouslySetInnerHTML={{ __html: embeds[url] }}
                    />
                  ) : (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 hover:underline"
                    >
                      {url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </TerminalSection>
    </section>
  );
}


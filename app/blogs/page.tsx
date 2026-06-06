"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, ExternalLink, Clock3, Search, Sparkles } from "lucide-react";
import { useData } from "@/lib/use-data";

export default function BlogsPage() {
  const { data: articles, loading } = useData<any[]>("blogs");
  const { data: site } = useData<any>("site");
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = site?.blogCategories || ["All", "Backend", "Full-Stack", "Frontend", "Web3"];

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    return articles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        article.title?.toLowerCase().includes(q) ||
        article.excerpt?.toLowerCase().includes(q) ||
        article.tags?.some((tag: string) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [articles, activeCategory, query]);

  const featuredArticle = filteredArticles.find((a) => a.featured) ?? filteredArticles[0];

  const writingAreas = [
    { label: "Systems Thinking", title: "Architecture over hacks", desc: "Posts around tenancy, API boundaries, caching, scaling, and production tradeoffs." },
    { label: "Build Process", title: "From idea to shipped system", desc: "Breakdowns of how I structure work, reduce chaos, and turn messy product ideas into maintainable code." },
    { label: "Frontend Discipline", title: "UI that feels intentional", desc: "Layout systems, typography, interaction patterns, and how to avoid generic-looking interfaces." },
  ];

  if (loading) return (
    <main className="flex min-h-screen items-center justify-center pt-14" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </main>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <main className="relative min-h-screen overflow-x-hidden pt-14" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", transition: "background-color 0.3s ease, color 0.3s ease", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-[8%] h-[260px] w-[260px] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[520px] rounded-full bg-[var(--glow)] blur-[90px] sm:blur-[110px] lg:blur-[130px]" />
          <div className="absolute bottom-0 right-[10%] h-[220px] w-[220px] sm:h-[320px] sm:w-[320px] lg:h-[420px] lg:w-[420px] rounded-full bg-[var(--glow)] blur-[90px] sm:blur-[100px] lg:blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <header className="grid grid-cols-1 gap-8 border-b border-[var(--border-color)] pb-10 pt-24 sm:pb-12 sm:pt-28 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:pb-14 lg:pt-20">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
                <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" />
                Writing
              </div>
              <h1 className="text-[clamp(34px,10vw,88px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
                Notes on<br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--stroke)" }}>systems</span> & shipping
              </h1>
              <p className="mt-5 max-w-[520px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-[1.8] md:text-base">
                Writing about backend architecture, full-stack systems, frontend structure, and the engineering decisions that actually matter once a product starts growing.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {[
                { num: String(articles?.length || 0), label: "Articles" },
                { num: "4", label: "Topics" },
                { num: "0", label: "Fluff" },
              ].map(({ num, label }, i) => (
                <div key={i} className="flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 text-left lg:items-end lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
                  <span className="text-[28px] font-bold leading-none text-[var(--text-primary)] sm:text-[34px] lg:text-[40px]" style={{ fontFamily: "'Syne', sans-serif" }}>{num}</span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)] sm:text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</span>
                </div>
              ))}
            </div>
          </header>

          <section className="mb-10 mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] md:mb-12 md:grid-cols-3">
            {writingAreas.map((area) => (
              <div key={area.title} className="bg-[var(--bg-primary)] p-5 sm:p-6 md:p-7">
                <span className="mb-4 inline-flex rounded border border-blue-500/20 bg-[var(--accent-bg)] px-2 py-[4px] text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{area.label}</span>
                <h3 className="mb-3 text-[17px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[18px]" style={{ fontFamily: "'Syne', sans-serif" }}>{area.title}</h3>
                <p className="text-[13px] font-light leading-7 text-[var(--text-secondary)] sm:text-[14px] sm:leading-[1.75]">{area.desc}</p>
              </div>
            ))}
          </section>

          <section className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category: string) => (
                <button key={category} onClick={() => setActiveCategory(category)}
                  className={`rounded border px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition-all sm:px-4 sm:py-[7px] sm:text-[11px] ${activeCategory === category ? "border-blue-500 bg-[var(--accent-bg)] text-[var(--accent-text)]" : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"}`}
                  style={{ fontFamily: "'DM Mono', monospace" }}>{category}</button>
              ))}
            </div>

            <div className="relative w-full lg:w-[320px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts, topics, stack..."
                className="w-full rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-blue-500/40 focus:bg-[var(--bg-secondary)]" />
            </div>
          </section>

          {featuredArticle && (
            <section className="mb-12 sm:mb-14">
              <div className="mb-5 flex items-center gap-4 sm:mb-6">
                <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Featured article</span>
                <div className="h-px flex-1 bg-[var(--card-border)]" />
              </div>

              <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border-color)] lg:grid-cols-[1.2fr_0.8fr]">
                <div className="border-b border-[var(--border-color)] bg-[var(--bg-primary)] p-5 sm:p-7 md:p-8 lg:border-b-0 lg:border-r lg:p-10">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="rounded border border-[var(--accent)] bg-[var(--accent-bg)] px-2 py-[3px] text-[10px] uppercase tracking-[0.15em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{featuredArticle.type}</span>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{featuredArticle.category}</span>
                  </div>
                  <h2 className="mb-4 text-[clamp(24px,6vw,44px)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>{featuredArticle.title}</h2>
                  <p className="mb-6 max-w-[650px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:text-[15px] sm:leading-[1.85]">{featuredArticle.excerpt}</p>
                  <div className="mb-7 flex flex-wrap gap-[6px] sm:mb-8">
                    {featuredArticle.tags?.map((tag: string) => (
                      <span key={tag} className="rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-[3px] text-[10px] tracking-[0.05em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link href={`/blog/${featuredArticle.slug}`} className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--btn-bg)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--btn-text)] transition-colors hover:bg-[var(--btn-hover)]" style={{ fontFamily: "'DM Mono', monospace" }}>Read article <ArrowUpRight size={12} /></Link>
                    <Link href={`/blog/${featuredArticle.slug}`} className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-color)] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}>Open page <ExternalLink size={12} /></Link>
                  </div>
                </div>
                <div className="flex flex-col justify-between bg-[var(--bg-secondary)] p-5 sm:p-7 md:p-8 lg:p-10">
                  <div>
                    <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>
                      <Sparkles size={12} className="text-[var(--accent-text)]" /> Why this matters
                    </div>
                    <div className="space-y-4">
                      {["Most backend articles stay shallow. They explain tools, not decisions.", "This writing focuses on tradeoffs, constraints, and what breaks in real systems.", "That makes it more useful to people actually building products."].map((point) => (
                        <div key={point} className="flex gap-3 text-sm font-light leading-relaxed text-[var(--text-secondary)]">
                          <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-border)] sm:grid-cols-2 lg:mt-10">
                    {[{ label: "Published", value: featuredArticle.date }, { label: "Reading time", value: featuredArticle.readTime }].map((item) => (
                      <div key={item.label} className="bg-[var(--bg-primary)] p-4">
                        <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.label}</div>
                        <div className="text-sm text-[var(--text-primary)]">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </section>
          )}

          <section className="mb-16 sm:mb-20">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>All writing</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
              <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{filteredArticles.length} results</span>
            </div>

            <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)]">
              {filteredArticles.length === 0 ? (
                <div className="bg-[var(--bg-primary)] p-8 text-center sm:p-10">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>No results</p>
                  <p className="text-sm text-[var(--text-secondary)]">Your search is too narrow. Fix the filter or stop searching nonsense.</p>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="group grid grid-cols-1 bg-[var(--bg-primary)] transition-colors hover:bg-[var(--bg-secondary)] sm:grid-cols-[60px_1fr] md:grid-cols-[70px_1fr_auto]">
                    <div className="hidden border-r border-[var(--border-color)] pt-7 sm:flex sm:items-start sm:justify-center">
                      <span className="text-[11px] tracking-[0.1em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{article.id}</span>
                    </div>
                    <div className="p-5 sm:p-6 md:p-7">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="rounded border border-[var(--accent)] bg-[var(--accent-bg)] px-2 py-[3px] text-[10px] uppercase tracking-[0.15em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{article.type}</span>
                        <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{article.category}</span>
                      </div>
                      <h3 className="mb-3 text-[20px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-text)] sm:text-[22px]" style={{ fontFamily: "'Syne', sans-serif" }}>{article.title}</h3>
                      <p className="mb-4 max-w-[680px] text-sm font-light leading-relaxed text-[var(--text-secondary)]">{article.excerpt}</p>
                      <div className="mb-4 flex flex-wrap gap-[6px] md:mb-0">
                        {article.tags?.map((tag: string) => (
                          <span key={tag} className="rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-[3px] text-[10px] tracking-[0.05em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}>{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-[var(--border-color)] pt-4 md:hidden">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}><Clock3 size={11} /> {article.readTime}</div>
                          <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{article.date}</div>
                        </div>
                        <ArrowUpRight size={18} className="text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-text)]" />
                      </div>
                    </div>
                    <div className="hidden min-w-[150px] flex-col items-end justify-between border-l border-[var(--border-color)] p-6 md:flex lg:min-w-[170px] lg:p-7">
                      <ArrowUpRight size={18} className="text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-text)]" />
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}><Clock3 size={11} /> {article.readTime}</div>
                        <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{article.date}</div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 rounded-2xl border border-[var(--border-color)] p-5 sm:gap-8 sm:p-8 md:grid-cols-[1fr_auto] md:items-center lg:p-10">
            <div>
              <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[26px] lg:text-[28px]" style={{ fontFamily: "'Syne', sans-serif" }}>Want more engineering breakdowns?<br /><span className="font-normal text-[var(--text-secondary)]">Read the work, then judge the thinking.</span></h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <Link href="/projects" className="flex items-center justify-center gap-2 rounded-md bg-[var(--btn-bg)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--btn-text)] transition-colors hover:bg-[var(--btn-hover)]" style={{ fontFamily: "'DM Mono', monospace" }}>View projects <ArrowUpRight size={12} /></Link>
              <Link href="/system" className="flex items-center justify-center gap-2 rounded-md border border-[var(--border-color)] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}><BookOpen size={12} /> Engineering systems</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  Clock3,
  Search,
  Sparkles,
} from "lucide-react";

const articles = [
  {
    id: "01",
    slug: "designing-multi-tenant-systems",
    type: "Deep Dive",
    category: "Backend",
    title: "Designing Multi-Tenant Systems Without Creating a Data Leak Nightmare",
    excerpt:
      "Schema-per-tenant vs shared-table tenancy, tradeoffs that actually matter, and why convenience-first architecture usually turns into future damage.",
    readTime: "8 min read",
    date: "Apr 05, 2026",
    featured: true,
    tags: ["PostgreSQL", "Architecture", "Multi-Tenant", "Security"],
  },
  {
    id: "02",
    slug: "redis-caching-that-doesnt-break",
    type: "Engineering Note",
    category: "Backend",
    title: "Redis Caching That Doesn’t Rot Your System From the Inside",
    excerpt:
      "Caching is easy until invalidation turns your app into a liar. This breaks down practical TTL strategy, namespaced keys, and targeted invalidation.",
    readTime: "6 min read",
    date: "Apr 02, 2026",
    featured: false,
    tags: ["Redis", "Caching", "Performance"],
  },
  {
    id: "03",
    slug: "plugin-architecture-for-governance",
    type: "Case Study",
    category: "Web3",
    title: "Plugin-Based Governance Logic for DAOs on Solana",
    excerpt:
      "How to avoid hardcoded voting logic, reduce migration pain, and design swappable governance systems around constrained on-chain architecture.",
    readTime: "9 min read",
    date: "Mar 29, 2026",
    featured: false,
    tags: ["Rust", "Solana", "DAO", "Plugins"],
  },
  {
    id: "04",
    slug: "production-api-structure",
    type: "Build Log",
    category: "Full-Stack",
    title: "How I Structure Production APIs So They Don’t Collapse Under Growth",
    excerpt:
      "Controllers, services, validation boundaries, auth layers, cache placement, and why most beginner backends become unreadable after 3 months.",
    readTime: "7 min read",
    date: "Mar 24, 2026",
    featured: false,
    tags: ["Node.js", "TypeScript", "APIs", "Scalability"],
  },
  {
    id: "05",
    slug: "frontend-that-doesnt-look-generic",
    type: "Frontend Note",
    category: "Frontend",
    title: "Building Frontend Systems That Don’t Look Like Another Tailwind Clone",
    excerpt:
      "Reusable UI patterns, spacing rhythm, typography hierarchy, and how to make a portfolio feel engineered instead of assembled.",
    readTime: "5 min read",
    date: "Mar 18, 2026",
    featured: false,
    tags: ["Next.js", "UI Systems", "Tailwind"],
  },
  {
    id: "06",
    slug: "validation-at-the-boundary",
    type: "Engineering Principle",
    category: "Backend",
    title: "Validate at the Boundary or Pay for It Everywhere Else",
    excerpt:
      "Why request validation belongs at the edge, why service-layer overvalidation is a smell, and how Zod keeps contracts explicit.",
    readTime: "4 min read",
    date: "Mar 12, 2026",
    featured: false,
    tags: ["Zod", "Validation", "API Design"],
  },
];

const categories = ["All", "Backend", "Full-Stack", "Frontend", "Web3"];

const writingAreas = [
  {
    label: "Systems Thinking",
    title: "Architecture over hacks",
    desc: "Posts around tenancy, API boundaries, caching, scaling, and production tradeoffs.",
  },
  {
    label: "Build Process",
    title: "From idea to shipped system",
    desc: "Breakdowns of how I structure work, reduce chaos, and turn messy product ideas into maintainable code.",
  },
  {
    label: "Frontend Discipline",
    title: "UI that feels intentional",
    desc: "Layout systems, typography, interaction patterns, and how to avoid generic-looking interfaces.",
  },
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;

      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const featuredArticle =
    filteredArticles.find((article) => article.featured) ?? filteredArticles[0];

  const listArticles = filteredArticles.filter(
    (article) => article.slug !== featuredArticle?.slug
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <main
        className="min-h-screen bg-[#09090b] text-white relative overflow-x-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-[8%] w-[520px] h-[420px] rounded-full bg-blue-500/[0.05] blur-[130px]" />
          <div className="absolute bottom-0 right-[10%] w-[420px] h-[420px] rounded-full bg-blue-500/[0.03] blur-[110px]" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-24">
          {/* HEADER */}
          <header className="pt-30 md:pt-20 pb-14 border-b border-white/[0.07] mb-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8">
            <div>
              <div
                className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-[0.2em] text-zinc-500"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span className="w-6 h-px bg-zinc-700 block" />
                Writing
              </div>

              <h1
                className="text-[clamp(48px,7vw,88px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Notes on
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
                >
                  systems
                </span>{" "}
                & shipping
              </h1>

              <p className="mt-6 text-base leading-[1.75] text-zinc-500 font-light max-w-[520px]">
                Writing about backend architecture, full-stack systems, frontend
                structure, and the engineering decisions that actually matter
                once a product starts growing.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-4 pb-1">
              {[
                { num: String(articles.length), label: "Articles" },
                { num: "4", label: "Topics" },
                { num: "0", label: "Fluff" },
              ].map(({ num, label }, i) => (
                <div key={i} className="flex flex-col items-end gap-1">
                  {i > 0 && (
                    <div className="w-px h-10 bg-white/[0.1] self-center mb-1" />
                  )}
                  <span
                    className="text-[40px] font-bold text-white leading-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] text-zinc-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </header>

          {/* TOPIC STRIP */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden mb-12">
            {writingAreas.map((area) => (
              <div key={area.title} className="bg-[#09090b] p-6 md:p-7">
                <span
                  className="inline-flex mb-4 text-[10px] uppercase tracking-[0.14em] text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-2 py-[4px]"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {area.label}
                </span>
                <h3
                  className="text-[18px] font-bold tracking-[-0.02em] text-white mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {area.title}
                </h3>
                <p className="text-[14px] leading-[1.75] text-zinc-500 font-light">
                  {area.desc}
                </p>
              </div>
            ))}
          </section>

          {/* FILTERS + SEARCH */}
          <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-[11px] uppercase tracking-[0.12em] px-4 py-[6px] rounded border transition-all ${
                    activeCategory === category
                      ? "border-blue-500 text-blue-400 bg-blue-500/10"
                      : "border-white/[0.07] text-zinc-500 bg-transparent hover:border-white/[0.12] hover:text-zinc-200 hover:bg-white/[0.03]"
                  }`}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-[320px]">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, topics, stack..."
                className="w-full bg-[#0f0f11] border border-white/[0.07] rounded-md pl-10 pr-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-blue-500/40 focus:bg-[#111113] transition-colors"
              />
            </div>
          </section>

          {/* FEATURED ARTICLE */}
          {featuredArticle && (
            <section className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Featured article
                </span>
                <div className="flex-1 h-px bg-white/[0.07]" />
              </div>

              <article className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="bg-[#09090b] p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.07]">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span
                      className="text-[10px] uppercase tracking-[0.15em] text-blue-400 bg-blue-500/10 border border-blue-500/25 rounded px-2 py-[3px]"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {featuredArticle.type}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-[0.12em] text-zinc-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2
                    className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] leading-[1.02] text-white mb-5 max-w-[760px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {featuredArticle.title}
                  </h2>

                  <p className="text-[15px] leading-[1.85] text-zinc-500 font-light max-w-[650px] mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-[6px] mb-8">
                    {featuredArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-zinc-500 bg-zinc-900 border border-white/[0.07] rounded px-2 py-[3px] tracking-[0.05em]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/blogs/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors font-medium"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Read article <ArrowUpRight size={12} />
                    </Link>

                    <Link
                      href={`/blogs/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md border border-white/[0.07] text-zinc-500 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Open page <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>

                <div className="bg-[#0d0d10] p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div
                      className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.14em] text-zinc-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      <Sparkles size={12} className="text-blue-400" />
                      Why this matters
                    </div>

                    <div className="space-y-4">
                      {[
                        "Most backend articles stay shallow. They explain tools, not decisions.",
                        "This writing focuses on tradeoffs, constraints, and what breaks in real systems.",
                        "That makes it more useful to people actually building products."
                      ].map((point) => (
                        <div
                          key={point}
                          className="flex gap-3 text-sm text-zinc-500 font-light leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0 mt-[9px]" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/[0.07] grid grid-cols-2 gap-px bg-white/[0.07] rounded-xl overflow-hidden">
                    {[
                      { label: "Published", value: featuredArticle.date },
                      { label: "Reading time", value: featuredArticle.readTime },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-[#09090b] p-4"
                      >
                        <div
                          className="text-[9px] uppercase tracking-[0.14em] text-zinc-600 mb-2"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {item.label}
                        </div>
                        <div className="text-sm text-zinc-200">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </section>
          )}

          {/* ARTICLE LIST */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                All writing
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span
                className="text-[10px] uppercase tracking-[0.1em] text-zinc-600"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {filteredArticles.length} results
              </span>
            </div>

            <div className="flex flex-col gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {filteredArticles.length === 0 ? (
                <div className="bg-[#09090b] p-10 text-center">
                  <p
                    className="text-[11px] uppercase tracking-[0.16em] text-zinc-600 mb-3"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    No results
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Your search is too narrow. Fix the filter or stop searching nonsense.
                  </p>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blogs/${article.slug}`}
                    className="grid grid-cols-[70px_1fr_auto] items-stretch bg-[#09090b] hover:bg-[#111113] transition-colors group"
                  >
                    <div className="hidden sm:flex items-start justify-center pt-7 border-r border-white/[0.07]">
                      <span
                        className="text-[11px] text-zinc-600 tracking-[0.1em]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {article.id}
                      </span>
                    </div>

                    <div className="p-6 md:p-7">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className="text-[10px] uppercase tracking-[0.15em] text-blue-400 bg-blue-500/10 border border-blue-500/25 rounded px-2 py-[3px]"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {article.type}
                        </span>
                        <span
                          className="text-[10px] uppercase tracking-[0.12em] text-zinc-600"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {article.category}
                        </span>
                      </div>

                      <h3
                        className="text-[22px] font-bold tracking-[-0.02em] text-white leading-tight mb-3 group-hover:text-blue-400 transition-colors"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {article.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-zinc-500 font-light max-w-[680px] mb-4">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-[6px]">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-zinc-500 bg-zinc-900 border border-white/[0.07] rounded px-2 py-[3px] tracking-[0.05em]"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end justify-between p-7 border-l border-white/[0.07] min-w-[170px]">
                      <ArrowUpRight
                        size={18}
                        className="text-zinc-600 group-hover:text-blue-400 transition-colors"
                      />
                      <div className="flex flex-col items-end gap-2">
                        <div
                          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-zinc-500"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          <Clock3 size={11} />
                          {article.readTime}
                        </div>
                        <div
                          className="text-[10px] uppercase tracking-[0.1em] text-zinc-600"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {article.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* FOOTER CTA */}
          <section className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 p-10 border border-white/[0.07] rounded-2xl">
            <div>
              <h3
                className="text-[28px] font-bold tracking-[-0.02em] text-white leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want more engineering breakdowns?
                <br />
                <span className="text-zinc-500 font-normal">
                  Read the work, then judge the thinking.
                </span>
              </h3>
            </div>

            <div className="flex gap-3 flex-shrink-0 flex-wrap">
              <Link
                href="/projects"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors font-medium"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                View projects <ArrowUpRight size={12} />
              </Link>

              <Link
                href="/system"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md border border-white/[0.07] text-zinc-500 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <BookOpen size={12} />
                Engineering systems
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
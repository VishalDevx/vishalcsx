"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { useData } from "@/lib/use-data";
import Image from "next/image";

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: articles, loading } = useData<any[]>("blogs");

  if (loading) return (
    <main className="flex min-h-screen items-center justify-center pt-14" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </main>
  );

  const article = articles?.find((a: any) => a.slug === slug);

  if (!article) return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 pt-14" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Article not found</p>
      <Link href="/blogs" className="text-sm underline" style={{ color: "var(--accent-text)" }}>Back to blogs</Link>
    </main>
  );

  return (
    <main style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }} className="pt-14">
      <article className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <Link href="/blogs" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] transition-all hover:text-[var(--text-primary)]" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>
          <ArrowLeft size={14} /> Back to articles
        </Link>

        {article.image && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-color)" }}>
            <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
          </div>
        )}

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded border px-2 py-[3px] text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: "var(--accent)", backgroundColor: "var(--accent-bg)", color: "var(--accent-text)", fontFamily: "'DM Mono', monospace" }}>{article.type}</span>
          <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{article.category}</span>
        </div>

        <h1 className="mb-6 text-[clamp(32px,6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{article.title}</h1>

        <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.1em]" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>
          <span>{article.date}</span>
          <span className="h-3 w-px" style={{ backgroundColor: "var(--border-color)" }} />
          <span className="flex items-center gap-1.5"><Clock3 size={12} /> {article.readTime}</span>
        </div>

        <p className="mb-8 max-w-[700px] text-base font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{article.excerpt}</p>

        <div className="mb-10 flex flex-wrap gap-2">
          {article.tags?.map((tag: string) => (
            <span key={tag} className="rounded border px-2 py-[3px] text-[10px] tracking-[0.05em]" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace" }}>{tag}</span>
          ))}
        </div>

        <div className="border-t pt-8" style={{ borderColor: "var(--border-color)" }}>
          <div className="prose prose-sm max-w-none" style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
            {article.content ? (
              article.content.split("\n").map((line: string, i: number) => (
                <p key={i} className="mb-4">{line}</p>
              ))
            ) : (
              <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>Full content coming soon.</p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

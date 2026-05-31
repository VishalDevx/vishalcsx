"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useData } from "@/lib/use-data";
import Image from "next/image";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: projects, loading } = useData<any[]>("projects");

  if (loading) return (
    <main className="flex min-h-screen items-center justify-center pt-14" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </main>
  );

  const project = projects?.find((p: any) => p.slug === slug);

  if (!project) return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 pt-14" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Project not found</p>
      <Link href="/projects" className="text-sm underline" style={{ color: "var(--accent-text)" }}>Back to projects</Link>
    </main>
  );

  return (
    <main style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }} className="pt-14">
      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] transition-all hover:text-[var(--text-primary)]" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>
          <ArrowLeft size={14} /> Back to projects
        </Link>

        {project.image && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-color)" }}>
            <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
          </div>
        )}

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded border px-2 py-[3px] text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: "var(--accent)", backgroundColor: "var(--accent-bg)", color: "var(--accent-text)", fontFamily: "'DM Mono', monospace" }}>{project.category}</span>
          <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{project.label}</span>
        </div>

        <h1 className="mb-6 text-[clamp(32px,6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h1>

        <p className="mb-8 max-w-[700px] text-base font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.description}</p>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.stack?.map((tech: string) => (
            <span key={tech} className="rounded border px-2 py-[3px] text-[10px] tracking-[0.05em]" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace" }}>{tech}</span>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-xs uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace" }}>
              <Github size={14} /> Source Code <ArrowUpRight size={11} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-90" style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)", fontFamily: "'DM Mono', monospace" }}>
              <ExternalLink size={14} /> {project.caseStudyLabel || "Live Demo"} <ArrowUpRight size={11} />
            </a>
          )}
        </div>

        {project.points && project.points.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>Key Features</h2>
            <div className="flex flex-col gap-4">
              {project.points.map((point: string) => (
                <div key={point} className="flex gap-3 text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

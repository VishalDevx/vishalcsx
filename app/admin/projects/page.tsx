"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, Search, Github } from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    setLoading(true);
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects?slug=${slug}`, { method: "DELETE" });
    fetchProjects();
  };

  const filtered = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(query.toLowerCase()) ||
      p.stack?.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Projects</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
        >
          <Plus size={16} /> New Project
        </Link>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..."
          className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[var(--accent)]/40"
          style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border py-12 text-center" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-px overflow-hidden rounded-xl border" style={{ borderColor: "var(--border-color)", background: "var(--border-color)" }}>
          {filtered.map((project) => (
            <div key={project.slug} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between" style={{ background: "var(--bg-primary)" }}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium" style={{ color: "var(--text-primary)" }}>{project.title}</h3>
                  <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: "var(--accent-bg)", color: "var(--accent-text)" }}>{project.category}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs" style={{ color: "var(--text-secondary)" }}>{project.description}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {project.stack?.slice(0, 4).map((t: string) => (
                    <span key={t} className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={project.githubUrl} target="_blank" className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all hover:bg-[var(--card-hover)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                  <Github size={12} /> Code
                </Link>
                <Link href={`/admin/projects/edit/${project.slug}`} className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all hover:bg-[var(--card-hover)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                  <Edit3 size={12} /> Edit
                </Link>
                <button onClick={() => handleDelete(project.slug)} className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, Search } from "lucide-react";

export default function AdminSkills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSkills = () => {
    setLoading(true);
    fetch("/api/admin/skills")
      .then((r) => r.json())
      .then(setSkills)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this skill group?")) return;
    await fetch(`/api/admin/skills?slug=${slug}`, { method: "DELETE" });
    fetchSkills();
  };

  const filtered = skills.filter(
    (s) =>
      s.title?.toLowerCase().includes(query.toLowerCase()) ||
      s.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Skills</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Manage your skill groups</p>
        </div>
        <Link
          href="/admin/skills/new"
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
        >
          <Plus size={16} /> New Skill
        </Link>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills..."
          className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[var(--accent)]/40"
          style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border py-12 text-center" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No skills found. Add your first skill group!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-px overflow-hidden rounded-xl border" style={{ borderColor: "var(--border-color)", background: "var(--border-color)" }}>
          {filtered.map((skill) => (
            <div key={skill.slug} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between" style={{ background: "var(--bg-primary)" }}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium" style={{ color: "var(--text-primary)" }}>{skill.title}</h3>
                  <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: "var(--accent-bg)", color: "var(--accent-text)" }}>{skill.category}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs" style={{ color: "var(--text-secondary)" }}>{skill.description}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {skill.stack?.slice(0, 3).map((t: string) => (
                    <span key={t} className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/skills/edit/${skill.slug}`} className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all hover:bg-[var(--card-hover)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                  <Edit3 size={12} /> Edit
                </Link>
                <button onClick={() => handleDelete(skill.slug)} className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
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

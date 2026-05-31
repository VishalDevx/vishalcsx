"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProject() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", category: "Full-Stack", label: "", description: "",
    image: "", stack: "", points: "", githubUrl: "", liveUrl: "",
    caseStudyLabel: "Live Demo", featured: true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...form,
      stack: form.stack.split(",").map((t) => t.trim()).filter(Boolean),
      points: form.points.split("\n").map((p) => p.trim()).filter(Boolean),
    };

    await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    router.push("/admin/projects");
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/projects" className="flex h-8 w-8 items-center justify-center rounded-lg border transition-all hover:bg-[var(--card-hover)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>New Project</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Add a project to your portfolio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }}>
              {["Full-Stack", "Backend", "Frontend"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Label</label>
            <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="e.g. Realtime Collaboration"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Stack (comma separated)</label>
            <input value={form.stack} onChange={(e) => setForm({ ...form, stack: e.target.value })} placeholder="Next.js, TypeScript, PostgreSQL, ..."
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Key Points (one per line)</label>
            <textarea value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} rows={4}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
            <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Image URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://example.com/project.png"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>GitHub URL</label>
            <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Live URL</label>
            <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Case Study Label</label>
            <input value={form.caseStudyLabel} onChange={(e) => setForm({ ...form, caseStudyLabel: e.target.value })}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured Project
            </label>
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}>
          <Save size={16} /> {saving ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}

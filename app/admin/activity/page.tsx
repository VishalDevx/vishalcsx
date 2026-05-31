"use client";

import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";

export default function AdminActivity() {
  const [data, setData] = useState<any>({ feed: [], snapshots: [], timeline: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("feed");

  useEffect(() => {
    fetch("/api/admin/activity")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const addItem = () => {
    const newItem = { index: String(data.feed.length + 1).padStart(2, "0"), slug: "", category: "Building", label: "", title: "", description: "", tags: [], points: [], type: "building" };
    setData({ ...data, feed: [...data.feed, newItem] });
  };

  const removeItem = (idx: number) => {
    setData({ ...data, feed: data.feed.filter((_: any, i: number) => i !== idx) });
  };

  const updateItem = (idx: number, field: string, value: any) => {
    const feed = [...data.feed];
    feed[idx] = { ...feed[idx], [field]: value };
    setData({ ...data, feed });
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/activity", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Activity</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Manage your activity feed</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}>
          <Save size={16} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      <div className="mb-4 flex gap-2 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>
        {["feed", "snapshots", "timeline"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="rounded px-3 py-1.5 text-xs font-medium capitalize transition-all"
            style={{ background: tab === t ? "var(--accent-bg)" : "transparent", color: tab === t ? "var(--accent-text)" : "var(--text-secondary)" }}>{t}</button>
        ))}
      </div>

      {tab === "feed" && (
        <div className="flex flex-col gap-3">
          {data.feed.map((item: any, idx: number) => (
            <div key={idx} className="rounded-xl border p-4" style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Feed #{idx + 1}</span>
                <button onClick={() => removeItem(idx)} className="text-red-500 transition-all hover:text-red-400"><Trash2 size={14} /></button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={item.title} onChange={(e) => updateItem(idx, "title", e.target.value)} placeholder="Title" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--accent)]/40 sm:col-span-2" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
                <input value={item.slug} onChange={(e) => updateItem(idx, "slug", e.target.value)} placeholder="slug" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--accent)]/40" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
                <input value={item.label} onChange={(e) => updateItem(idx, "label", e.target.value)} placeholder="Label" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--accent)]/40" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
                <input value={item.category} onChange={(e) => updateItem(idx, "category", e.target.value)} placeholder="Category" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--accent)]/40" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
                <input value={item.type} onChange={(e) => updateItem(idx, "type", e.target.value)} placeholder="Type" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--accent)]/40" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
                <input value={item.tags?.join(", ") || ""} onChange={(e) => updateItem(idx, "tags", e.target.value.split(",").map((t: string) => t.trim()).filter(Boolean))} placeholder="Tags (comma separated)" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--accent)]/40" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
                <textarea value={item.description} onChange={(e) => updateItem(idx, "description", e.target.value)} placeholder="Description" rows={2} className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--accent)]/40 sm:col-span-2" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
                <textarea value={item.points?.join("\n") || ""} onChange={(e) => updateItem(idx, "points", e.target.value.split("\n").map((p: string) => p.trim()).filter(Boolean))} placeholder="Key points (one per line)" rows={3} className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--accent)]/40 sm:col-span-2" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
              </div>
            </div>
          ))}
          <button onClick={addItem} className="flex items-center justify-center gap-2 rounded-xl border border-dashed py-4 text-sm transition-all hover:bg-[var(--card-hover)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
            <Plus size={16} /> Add Feed Item
          </button>
        </div>
      )}

      {tab === "snapshots" && (
        <div className="flex flex-col gap-3">
          <textarea value={JSON.stringify(data.snapshots, null, 2)} onChange={(e) => { try { setData({ ...data, snapshots: JSON.parse(e.target.value) }); } catch {} }}
            className="w-full rounded-lg border px-3 py-2.5 font-mono text-xs outline-none focus:border-[var(--accent)]/40" rows={15}
            style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
        </div>
      )}

      {tab === "timeline" && (
        <div className="flex flex-col gap-3">
          <textarea value={JSON.stringify(data.timeline, null, 2)} onChange={(e) => { try { setData({ ...data, timeline: JSON.parse(e.target.value) }); } catch {} }}
            className="w-full rounded-lg border px-3 py-2.5 font-mono text-xs outline-none focus:border-[var(--accent)]/40" rows={15}
            style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
        </div>
      )}
    </div>
  );
}

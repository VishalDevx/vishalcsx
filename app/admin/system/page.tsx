"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function AdminSystem() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("principles");

  useEffect(() => {
    fetch("/api/admin/system")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const update = (path: string, value: any) => {
    const copy = { ...data };
    const keys = path.split(".");
    let obj = copy;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setData(copy);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/system", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></div>;
  if (!data) return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>System / Engineering</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Edit system architecture page</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}>
          <Save size={16} /> {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>
        {["principles", "caseStudies", "techRadar", "scalePatterns", "tags", "raw"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="rounded px-3 py-1.5 text-xs font-medium capitalize transition-all"
            style={{ background: tab === t ? "var(--accent-bg)" : "transparent", color: tab === t ? "var(--accent-text)" : "var(--text-secondary)" }}>{t}</button>
        ))}
      </div>

      {tab === "principles" && (
        <Textarea label="Principles (JSON array)" value={JSON.stringify(data.principles || [], null, 2)} onChange={(v) => { try { update("principles", JSON.parse(v)); } catch {} }} rows={20} />
      )}

      {tab === "caseStudies" && (
        <Textarea label="Case Studies (JSON array)" value={JSON.stringify(data.caseStudies || [], null, 2)} onChange={(v) => { try { update("caseStudies", JSON.parse(v)); } catch {} }} rows={30} />
      )}

      {tab === "techRadar" && (
        <Textarea label="Tech Radar (JSON object)" value={JSON.stringify(data.techRadar || {}, null, 2)} onChange={(v) => { try { update("techRadar", JSON.parse(v)); } catch {} }} rows={20} />
      )}

      {tab === "scalePatterns" && (
        <Textarea label="Scale Patterns (JSON array)" value={JSON.stringify(data.scalePatterns || [], null, 2)} onChange={(v) => { try { update("scalePatterns", JSON.parse(v)); } catch {} }} rows={20} />
      )}

      {tab === "tags" && (
        <Textarea label="Tags (JSON array)" value={JSON.stringify(data.tags || [], null, 2)} onChange={(v) => { try { update("tags", JSON.parse(v)); } catch {} }} rows={5} />
      )}

      {tab === "raw" && (
        <Textarea label="Raw JSON" value={JSON.stringify(data, null, 2)} onChange={(v) => { try { setData(JSON.parse(v)); } catch {} }} rows={30} />
      )}
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 5 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
    </div>
  );
}

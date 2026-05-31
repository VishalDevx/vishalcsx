"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function AdminAbout() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("header");

  useEffect(() => {
    fetch("/api/admin/about")
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
    await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></div>;
  if (!data) return null;

  const tabs = ["header", "introSection", "identityCards", "focusAreas", "currentWork", "stackGroups", "journey", "raw"];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>About Page</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Edit about page content</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}>
          <Save size={16} /> {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="rounded px-3 py-1.5 text-xs font-medium capitalize transition-all"
            style={{ background: tab === t ? "var(--accent-bg)" : "transparent", color: tab === t ? "var(--accent-text)" : "var(--text-secondary)" }}>{t}</button>
        ))}
      </div>

      {tab === "header" && (
        <div className="flex flex-col gap-4">
          <Input label="Title" value={data.header?.title || ""} onChange={(v) => update("header.title", v)} />
          <Input label="Subtitle" value={data.header?.subtitle || ""} onChange={(v) => update("header.subtitle", v)} />
          <Textarea label="Description" value={data.header?.description || ""} onChange={(v) => update("header.description", v)} />
          <Textarea label="Badges (JSON)" value={JSON.stringify(data.header?.badges || [], null, 2)} onChange={(v) => { try { update("header.badges", JSON.parse(v)); } catch {} }} rows={5} />
        </div>
      )}

      {tab === "introSection" && (
        <div className="flex flex-col gap-4">
          <Input label="Title" value={data.introSection?.title || ""} onChange={(v) => update("introSection.title", v)} />
          <Textarea label="Description" value={data.introSection?.description || ""} onChange={(v) => update("introSection.description", v)} />
          <Textarea label="Profile Points (one per line)" value={(data.introSection?.profilePoints || []).join("\n")} onChange={(v) => update("introSection.profilePoints", v.split("\n").map((s: string) => s.trim()).filter(Boolean))} rows={5} />
          <Textarea label="Current Direction" value={data.introSection?.currentDirection || ""} onChange={(v) => update("introSection.currentDirection", v)} rows={3} />
        </div>
      )}

      {tab === "identityCards" && (
        <Textarea label="Identity Cards (JSON)" value={JSON.stringify(data.identityCards || [], null, 2)} onChange={(v) => { try { update("identityCards", JSON.parse(v)); } catch {} }} rows={20} />
      )}

      {tab === "focusAreas" && (
        <Textarea label="Focus Areas (JSON)" value={JSON.stringify(data.focusAreas || [], null, 2)} onChange={(v) => { try { update("focusAreas", JSON.parse(v)); } catch {} }} rows={20} />
      )}

      {tab === "currentWork" && (
        <Textarea label="Current Work (JSON)" value={JSON.stringify(data.currentWork || [], null, 2)} onChange={(v) => { try { update("currentWork", JSON.parse(v)); } catch {} }} rows={15} />
      )}

      {tab === "stackGroups" && (
        <Textarea label="Stack Groups (JSON)" value={JSON.stringify(data.stackGroups || [], null, 2)} onChange={(v) => { try { update("stackGroups", JSON.parse(v)); } catch {} }} rows={15} />
      )}

      {tab === "journey" && (
        <Textarea label="Journey (JSON)" value={JSON.stringify(data.journey || [], null, 2)} onChange={(v) => { try { update("journey", JSON.parse(v)); } catch {} }} rows={15} />
      )}

      {tab === "raw" && (
        <Textarea label="Raw JSON" value={JSON.stringify(data, null, 2)} onChange={(v) => { try { setData(JSON.parse(v)); } catch {} }} rows={30} />
      )}
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
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

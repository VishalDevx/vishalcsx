"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const [tab, setTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "", title: "", email: "", location: "", bio: "",
    github: "", linkedin: "", twitter: "", whatsapp: "",
  });

  const [site, setSite] = useState({
    adminUsername: "", adminPassword: "",
    blogCategories: "", projectCategories: "", skillCategories: "", activityFilters: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/data?file=profile").then((r) => r.json()),
      fetch("/api/data?file=site").then((r) => r.json()),
    ]).then(([p, s]) => {
      setProfile({
        name: p.name || "", title: p.title || "", email: p.email || "", location: p.location || "",
        bio: p.bio || "",
        github: p.socialLinks?.find((x: any) => x.platform === "github")?.url || "",
        linkedin: p.socialLinks?.find((x: any) => x.platform === "linkedin")?.url || "",
        twitter: p.socialLinks?.find((x: any) => x.platform === "twitter")?.url || "",
        whatsapp: p.socialLinks?.find((x: any) => x.platform === "whatsapp")?.url || "",
      });
      setSite({
        adminUsername: s.admin?.username || "admin",
        adminPassword: s.admin?.password || "admin123",
        blogCategories: (s.blogCategories || []).join(", "),
        projectCategories: (s.projectCategories || []).join(", "),
        skillCategories: (s.skillCategories || []).join(", "),
        activityFilters: (s.activityFilters || []).join(", "),
        whatsappNumber: s.whatsappNumber || "",
      });
    }).finally(() => setLoading(false));
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const socialLinks = [
      { platform: "github", label: "GitHub", url: profile.github, icon: "BsGithub" },
      { platform: "linkedin", label: "LinkedIn", url: profile.linkedin, icon: "BsLinkedin" },
      { platform: "twitter", label: "X", url: profile.twitter, icon: "BsTwitter" },
      { platform: "email", label: "Email", url: `mailto:${profile.email}`, icon: "SiGmail" },
    ];
    if (profile.whatsapp) {
      socialLinks.push({ platform: "whatsapp", label: "WhatsApp", url: profile.whatsapp, icon: "BsWhatsapp" });
    }
    await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profile.name, title: profile.title, email: profile.email,
        location: profile.location, bio: profile.bio, socialLinks,
      }),
    });
    setSaving(false);
  };

  const handleSiteSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const currentSite = await fetch("/api/data?file=site").then((r) => r.json());
    const updated = {
      ...currentSite,
      admin: { username: site.adminUsername, password: site.adminPassword },
      blogCategories: site.blogCategories.split(",").map((s) => s.trim()).filter(Boolean),
      projectCategories: site.projectCategories.split(",").map((s) => s.trim()).filter(Boolean),
      skillCategories: site.skillCategories.split(",").map((s) => s.trim()).filter(Boolean),
      activityFilters: site.activityFilters.split(",").map((s) => s.trim()).filter(Boolean),
      whatsappNumber: site.whatsappNumber,
    };
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></div>;

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Manage your site configuration</p>
      </div>

      <div className="mb-4 flex gap-2 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>
        <button onClick={() => setTab("profile")} className="rounded px-3 py-1.5 text-xs font-medium transition-all"
          style={{ background: tab === "profile" ? "var(--accent-bg)" : "transparent", color: tab === "profile" ? "var(--accent-text)" : "var(--text-secondary)" }}>Profile</button>
        <button onClick={() => setTab("site")} className="rounded px-3 py-1.5 text-xs font-medium transition-all"
          style={{ background: tab === "site" ? "var(--accent-bg)" : "transparent", color: tab === "site" ? "var(--accent-text)" : "var(--text-secondary)" }}>Site Config</button>
      </div>

      {tab === "profile" && (
        <form onSubmit={handleProfileSave} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
            <Input label="Site Title" value={profile.title} onChange={(v) => setProfile({ ...profile, title: v })} />
            <Input label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
            <Input label="Location" value={profile.location} onChange={(v) => setProfile({ ...profile, location: v })} />
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Bio</label>
              <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={4}
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
                style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
            </div>
            <Input label="GitHub URL" value={profile.github} onChange={(v) => setProfile({ ...profile, github: v })} />
            <Input label="LinkedIn URL" value={profile.linkedin} onChange={(v) => setProfile({ ...profile, linkedin: v })} />
            <Input label="X / Twitter URL" value={profile.twitter} onChange={(v) => setProfile({ ...profile, twitter: v })} />
            <Input label="WhatsApp URL" value={profile.whatsapp} onChange={(v) => setProfile({ ...profile, whatsapp: v })} placeholder="https://wa.me/1234567890" />
          </div>
          <button type="submit" disabled={saving}
            className="flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}>
            <Save size={16} /> {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}

      {tab === "site" && (
        <form onSubmit={handleSiteSave} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Admin Username" value={site.adminUsername} onChange={(v) => setSite({ ...site, adminUsername: v })} />
            <Input label="Admin Password" value={site.adminPassword} onChange={(v) => setSite({ ...site, adminPassword: v })} />
            <div className="sm:col-span-2">
              <Input label="WhatsApp Number (for hire button)" value={site.whatsappNumber} onChange={(v) => setSite({ ...site, whatsappNumber: v })} placeholder="+1234567890" />
            </div>
            <div className="sm:col-span-2">
              <Input label="Blog Categories (comma separated)" value={site.blogCategories} onChange={(v) => setSite({ ...site, blogCategories: v })} />
            </div>
            <div className="sm:col-span-2">
              <Input label="Project Categories (comma separated)" value={site.projectCategories} onChange={(v) => setSite({ ...site, projectCategories: v })} />
            </div>
            <div className="sm:col-span-2">
              <Input label="Skill Categories (comma separated)" value={site.skillCategories} onChange={(v) => setSite({ ...site, skillCategories: v })} />
            </div>
            <div className="sm:col-span-2">
              <Input label="Activity Filters (comma separated)" value={site.activityFilters} onChange={(v) => setSite({ ...site, activityFilters: v })} />
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}>
            <Save size={16} /> {saving ? "Saving..." : "Save Site Config"}
          </button>
        </form>
      )}
    </div>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]/40"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
    </div>
  );
}

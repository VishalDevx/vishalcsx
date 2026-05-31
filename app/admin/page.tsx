"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, FolderKanban, Plus, ExternalLink, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, projects: 0, publishedBlogs: 0, featuredProjects: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/blogs").then((r) => r.json()),
      fetch("/api/admin/projects").then((r) => r.json()),
    ]).then(([blogs, projects]) => {
      setStats({
        blogs: blogs.length,
        projects: projects.length,
        publishedBlogs: blogs.filter((b: any) => b.published).length,
        featuredProjects: projects.filter((p: any) => p.featured).length,
      });
    });
  }, []);

  const cards = [
    { label: "Total Blogs", value: stats.blogs, sub: `${stats.publishedBlogs} published`, icon: FileText, href: "/admin/blogs", color: "#3b82f6" },
    { label: "Total Projects", value: stats.projects, sub: `${stats.featuredProjects} featured`, icon: FolderKanban, href: "/admin/projects", color: "#8b5cf6" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Overview of your content</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
          >
            <Plus size={14} /> New Blog
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all hover:bg-[var(--card-hover)]"
            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            <Plus size={14} /> New Project
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-xl border p-5 transition-all hover:bg-[var(--card-hover)]"
            style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: `${card.color}15`, color: card.color }}
              >
                <card.icon size={18} />
              </div>
              <ArrowUpRight size={14} className="opacity-0 transition-all group-hover:opacity-100" style={{ color: "var(--text-muted)" }} />
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{card.value}</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{card.label}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>{card.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border p-5" style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}>
        <h2 className="mb-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Write a Blog Post", href: "/admin/blogs/new", icon: FileText },
            { label: "Add a Project", href: "/admin/projects/new", icon: FolderKanban },
            { label: "Update Settings", href: "/admin/settings", icon: ExternalLink },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all hover:bg-[var(--card-hover)]"
              style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
            >
              <action.icon size={14} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

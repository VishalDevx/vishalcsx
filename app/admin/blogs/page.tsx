"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, Search } from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    setLoading(true);
    fetch("/api/admin/blogs")
      .then((r) => r.json())
      .then(setBlogs)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/admin/blogs?slug=${slug}`, { method: "DELETE" });
    fetchBlogs();
  };

  const filtered = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(query.toLowerCase()) ||
      b.tags?.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Blog Posts</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Manage your articles</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blogs..."
          className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[var(--accent)]/40"
          style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border py-12 text-center" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No blogs found. Create your first post!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-px overflow-hidden rounded-xl border" style={{ borderColor: "var(--border-color)", background: "var(--border-color)" }}>
          {filtered.map((blog) => (
            <div
              key={blog.slug}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              style={{ background: "var(--bg-primary)" }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium" style={{ color: "var(--text-primary)" }}>{blog.title}</h3>
                  {blog.featured && (
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: "var(--accent-bg)", color: "var(--accent-text)" }}>Featured</span>
                  )}
                  {!blog.published && (
                    <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: "rgba(234,179,8,0.1)", color: "#ca8a04" }}>Draft</span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {blog.tags?.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}>{tag}</span>
                  ))}
                  {(blog.tags?.length || 0) > 3 && (
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>+{blog.tags.length - 3}</span>
                  )}
                </div>
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>{blog.date} · {blog.readTime}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/blogs/edit/${blog.slug}`}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all hover:bg-[var(--card-hover)]"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                >
                  <Edit3 size={12} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog.slug)}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                >
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

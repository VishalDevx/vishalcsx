"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, FolderKanban, Settings, LogOut, Menu, X, ExternalLink,
} from "lucide-react";

const SIDEBAR = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setAuthed(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></div>;
  if (!authed) return null;

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-14 items-center justify-between border-b border-[var(--border-color)] px-4">
          <Link href="/admin" className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Admin Panel
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden" style={{ color: "var(--text-secondary)" }}>
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {SIDEBAR.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-[var(--accent-bg)] font-medium"
                    : "hover:bg-[var(--card-hover)]"
                }`}
                style={{ color: active ? "var(--accent-text)" : "var(--text-secondary)" }}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--border-color)] p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-red-500/10"
            style={{ color: "var(--text-secondary)" }}
          >
            <LogOut size={16} />
            Logout
          </button>
          <Link
            href="/"
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-[var(--card-hover)]"
            style={{ color: "var(--text-muted)" }}
          >
            <ExternalLink size={16} />
            View Site
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-[var(--border-color)] bg-[var(--bg-primary)] px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden" style={{ color: "var(--text-secondary)" }}>
            <Menu size={18} />
          </button>
          <div className="flex-1" />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

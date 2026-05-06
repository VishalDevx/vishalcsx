"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "System", href: "/system" },
  { label: "Blog", href: "/blogs" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
  { label: "Activity", href: "/activity" },
  { label: "Contact", href: "/contact-me" },
];

const SOCIALS = [
  { icon: FaGithub, href: "https://github.com/VishalDevx", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/vishal-singh-779054260/", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://www.x.com/VishalCsx", label: "X" },
  { icon: SiGmail, href: "mailto:vishalcsx@gmail.com", label: "Email" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 6px;
          border: 0.5px solid transparent;
          color: var(--text-muted);
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-secondary);
        }
        .nav-link.active {
          color: var(--text-primary);
          border-color: var(--border-color);
          background: var(--bg-secondary);
        }

        .mobile-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 12px 14px;
          border-radius: 8px;
          display: block;
          transition: all 0.15s ease;
          border: 0.5px solid transparent;
        }
        .mobile-nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-secondary);
        }
        .mobile-nav-link.active {
          color: var(--text-primary);
          background: var(--bg-secondary);
          border-color: var(--border-color);
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 0.5px solid var(--border-color);
          color: var(--icon-color);
          text-decoration: none;
          transition: all 0.15s ease;
          flex-shrink: 0;
          background: transparent;
        }
        .social-btn:hover {
          color: var(--icon-hover);
          border-color: var(--border-hover);
          background: var(--bg-secondary);
        }

        .hire-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--btn-text);
          background: var(--btn-bg);
          border: 0.5px solid var(--border-color);
          border-radius: 8px;
          padding: 8px 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .hire-btn:hover {
          background: var(--btn-hover);
        }

        .hamburger-btn {
          background: none;
          border: 0.5px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .hamburger-btn:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
          background: var(--bg-secondary);
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? "var(--bg-secondary)" : "var(--bg-primary)",
          borderBottom: `0.5px solid ${scrolled ? "var(--border-color)" : "var(--border-subtle)"}`,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-baseline gap-[3px] flex-shrink-0 no-underline">
            <span
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em" }}
            >
              Vishal
            </span>
            <span
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase" }}
            >
              .dev
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={`nav-link${isActive(href) ? " active" : ""}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1 lg:flex">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-btn">
                  <Icon size={13} />
                </a>
              ))}
            </div>

            <div className="hidden h-[18px] w-[0.5px] lg:block" style={{ background: "var(--divider-line)" }} />

            <ThemeToggle />

            <a href="mailto:vishalcsx@gmail.com" className="hire-btn hidden sm:inline-flex">
              Hire me <ArrowUpRight size={10} />
            </a>

            <button className="hamburger-btn lg:hidden" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ borderTop: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-primary)" }} className="px-4 pb-5 pt-3 lg:hidden">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} className={`mobile-nav-link${isActive(href) ? " active" : ""}`}>
                  {label}
                </Link>
              ))}
            </nav>

            <div style={{ borderTop: "0.5px solid var(--border-subtle)", marginTop: "16px", paddingTop: "16px" }} className="flex items-center justify-between">
              <span style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                Theme
              </span>
              <ThemeToggle />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-btn">
                  <Icon size={13} />
                </a>
              ))}

              <a href="mailto:vishalcsx@gmail.com" className="hire-btn ml-auto">
                Hire me <ArrowUpRight size={10} />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

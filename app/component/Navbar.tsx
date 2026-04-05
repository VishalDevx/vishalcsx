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
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/vishal-singh-779054260/",
    label: "LinkedIn",
  },
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        .nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 6px;
          border: 0.5px solid transparent;
          color: rgba(255,255,255,0.34);
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.03);
        }

        .nav-link.active {
          color: white;
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
        }

        .mobile-nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          padding: 12px 14px;
          border-radius: 8px;
          display: block;
          transition: all 0.15s ease;
          border: 0.5px solid transparent;
        }

        .mobile-nav-link:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.03);
        }

        .mobile-nav-link.active {
          color: white;
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.1);
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 0.5px solid transparent;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .social-btn:hover {
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
        }

        .hire-btn {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: white;
          background: rgba(255,255,255,0.06);
          border: 0.5px solid rgba(255,255,255,0.12);
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
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }

        .hamburger-btn {
          background: none;
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: rgba(255,255,255,0.6);
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
          border-color: rgba(255,255,255,0.18);
          color: white;
          background: rgba(255,255,255,0.04);
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(9,9,11,0.88)" : "#09090b",
          borderBottom: `0.5px solid ${
            scrolled ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.06)"
          }`,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "baseline",
              gap: "3px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "18px",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.04em",
              }}
            >
              Vishal
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.22)",
                textTransform: "uppercase",
              }}
            >
              .dev
            </span>
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive(href) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1 lg:flex">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-btn"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>

            <div
              className="hidden lg:block"
              style={{
                width: "0.5px",
                height: "18px",
                background: "rgba(255,255,255,0.08)",
              }}
            />

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <a
              href="mailto:vishalcsx@gmail.com"
              className="hire-btn hidden sm:inline-flex"
            >
              Hire me <ArrowUpRight size={10} />
            </a>

            <button
              className="hamburger-btn lg:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/[0.06] bg-[#09090b] px-4 pb-5 pt-3 sm:px-6 lg:hidden">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`mobile-nav-link${isActive(href) ? " active" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <div className="mb-4 flex items-center justify-between sm:hidden">
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                  Theme
                </span>
                <ThemeToggle />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-btn"
                    style={{ border: "0.5px solid rgba(255,255,255,0.09)" }}
                  >
                    <Icon size={13} />
                  </a>
                ))}

                <a
                  href="mailto:vishalcsx@gmail.com"
                  className="hire-btn ml-auto"
                >
                  Hire me <ArrowUpRight size={10} />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="h-14" />
    </>
  );
}
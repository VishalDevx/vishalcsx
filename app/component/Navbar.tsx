"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin,FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { ArrowUpRight, Menu, X } from "lucide-react";


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
  {icon : FaTwitter,href:"https://www.x.com/VishalCsx",label:"X"},
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
          color: rgba(255,255,255,0.32);
          transition: all 0.15s ease;
        }
        .nav-link:hover {
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.03);
        }
        .nav-link.active {
          color: white;
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 0.5px solid transparent;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .social-btn:hover {
          color: rgba(255,255,255,0.75);
          border-color: rgba(255,255,255,0.09);
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
          border-radius: 6px;
          padding: 6px 14px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.15s ease;
        }
        .hire-btn:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.2);
        }
        .mobile-nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 6px;
          display: block;
          transition: all 0.15s ease;
        }
        .mobile-nav-link:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.03);
        }
        .mobile-nav-link.active {
          color: white;
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.1);
        }
        .hamburger-btn {
          background: none;
          border: 0.5px solid rgba(255,255,255,0.09);
          border-radius: 6px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          transition: all 0.15s ease;
        }
        .hamburger-btn:hover {
          border-color: rgba(255,255,255,0.18);
          color: white;
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
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 32px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "baseline",
              gap: "3px",
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
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
            className="hidden md:flex"
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

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div className="hidden md:flex" style={{ alignItems: "center", gap: "2px" }}>
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
              className="hidden md:block"
              style={{
                width: "0.5px",
                height: "18px",
                background: "rgba(255,255,255,0.08)",
                margin: "0 6px",
              }}
            />

            <a href="mailto:vishal@example.com" className="hire-btn hidden md:flex">
              Hire me <ArrowUpRight size={10} />
            </a>

            <button
              className="hamburger-btn flex md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            style={{
              borderTop: "0.5px solid rgba(255,255,255,0.06)",
              background: "#09090b",
              padding: "8px 24px 20px",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                marginBottom: "16px",
              }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`mobile-nav-link${isActive(href) ? " active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingTop: "12px",
                borderTop: "0.5px solid rgba(255,255,255,0.06)",
              }}
            >
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  style={{ border: "0.5px solid rgba(255,255,255,0.09)" }}
                >
                  <Icon size={13} />
                </a>
              ))}
              <a href="mailto:vishal@example.com" className="hire-btn" style={{ marginLeft: "auto" }}>
                Hire me <ArrowUpRight size={10} />
              </a>
            </div>
          </div>
        )}
      </header>

      <div style={{ height: "56px" }} />
    </>
  );
}
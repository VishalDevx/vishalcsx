"use client";

import { useState } from "react";
import { useData } from "@/lib/use-data";

const RADAR_COLORS: Record<string, string> = {
  Adopt: "var(--accent-text)", Trial: "var(--accent)", Assess: "var(--accent-text)", Hold: "var(--text-muted)",
};

const NODE_STYLES: Record<string, string> = {
  client: "color:var(--accent-text);background:var(--accent-bg);borderColor:var(--accent)",
  gateway: "color:var(--accent-text);background:var(--accent-bg);borderColor:var(--accent)",
  service: "color:var(--accent-text);background:var(--accent-bg);borderColor:var(--accent)",
  infra: "color:var(--icon-color);background:var(--accent-bg);borderColor:var(--accent)",
  db: "color:var(--accent-text);background:var(--accent-bg);borderColor:var(--accent)",
};

function Mono({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--icon-color)" }}>{children}</span>;
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{text}</span>
      <div style={{ flex: 1, height: "0.5px", background: "var(--border-color)" }} />
    </div>
  );
}

function ArchDiagram({ rows, colors }: { rows: string[][]; colors: string[][] }) {
  return (
    <div style={{ padding: "22px 28px", borderTop: "0.5px solid var(--border-color)", background: "var(--bg-primary)" }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>Architecture flow</p>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6, paddingLeft: ri === 1 ? 160 : 0 }}>
          {row.map((node, ni) => (
            <span key={ni} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em", padding: "6px 12px", borderRadius: 4, border: "0.5px solid", whiteSpace: "nowrap", ...Object.fromEntries(NODE_STYLES[colors[ri][ni]]?.split(";").map((s) => { const [k, v] = s.split(":"); return [k.trim(), v?.trim()]; }) || []) }}>
              {node}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function DecisionTable({ rows }: { rows: { decision: string; chosen: string; rejected: string }[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginTop: 8 }}>
      <thead>
        <tr>
          {["Decision", "Chosen", "Rejected"].map((h) => (
            <th key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", padding: "8px 10px", textAlign: "left", borderBottom: "0.5px solid var(--border-color)" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.decision}>
            <td style={{ padding: "9px 10px", borderBottom: "0.5px solid var(--border-subtle)", color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", fontSize: 10, whiteSpace: "nowrap", verticalAlign: "top" }}>{r.decision}</td>
            <td style={{ padding: "9px 10px", borderBottom: "0.5px solid var(--border-subtle)", verticalAlign: "top" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", padding: "2px 7px", borderRadius: 3, color: "var(--accent-text)", background: "rgba(52,211,153,0.1)", border: "0.5px solid var(--accent)" }}>{r.chosen}</span>
            </td>
            <td style={{ padding: "9px 10px", borderBottom: "0.5px solid var(--border-subtle)", verticalAlign: "top" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", padding: "2px 7px", borderRadius: 3, color: "var(--accent-text)", background: "var(--accent-bg)", border: "0.5px solid var(--accent)" }}>{r.rejected}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SystemsPage() {
  const { data: system, loading } = useData<any>("system");
  const [openCS, setOpenCS] = useState<string | null>(null);
  const toggle = (id: string) => setOpenCS((prev) => (prev === id ? null : id));

  if (loading) return (
    <main style={{ minHeight: "100vh", paddingTop: "56px", backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </main>
  );

  if (!system) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        .cs-panel-grid { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .cs-panel-grid { grid-template-columns: 1fr; } .scale-grid { grid-template-columns: 1fr !important; } .radar-grid { grid-template-columns: 1fr 1fr !important; } .principles-grid { grid-template-columns: 1fr !important; } .metrics-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>

      <main style={{ minHeight: "100vh", paddingTop: "56px", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", transition: "background-color 0.3s ease, color 0.3s ease", fontFamily: "'Space Grotesk', sans-serif" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 80px" }} className="sm:px-8">

          <div style={{ padding: "64px 0 48px", borderBottom: "0.5px solid var(--border-color)", marginBottom: 60 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              <span style={{ width: 20, height: "0.5px", background: "var(--text-muted)", display: "block" }} />
              Engineering Systems
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px,6vw,76px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.035em", color: "var(--text-primary)" }}>
              How I{" "}<span style={{ WebkitTextStroke: "1.2px var(--stroke)", color: "transparent" }}>architect</span><br />and ship systems
            </h1>
            <p style={{ marginTop: 20, maxWidth: 520, fontSize: 15, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75 }}>
              Not UI mockups — real backend decisions, architecture tradeoffs, and the constraints that shaped every choice.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {system.tags?.map((t: string) => (
                <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 4, border: "0.5px solid var(--border-color)", color: "var(--text-secondary)", background: "var(--bg-secondary)" }}>{t}</span>
              ))}
            </div>
          </div>

          <SectionLabel text="Engineering principles" />
          <div className="principles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "var(--border-color)", border: "0.5px solid var(--border-color)", borderRadius: 14, overflow: "hidden", marginBottom: 72 }}>
            {system.principles?.map((p: any) => (
              <div key={p.num} style={{ background: "var(--bg-primary)", padding: 24 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 14 }}>{p.num}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.01em" }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, fontWeight: 300 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          <SectionLabel text="System case studies" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 72 }}>
            {system.caseStudies?.map((cs: any) => {
              const isOpen = openCS === cs.id;
              return (
                <article key={cs.id} style={{ border: `0.5px solid ${isOpen ? "var(--border-color)" : "var(--border-color)"}`, borderRadius: 20, overflow: "hidden", transition: "border-color 0.15s" }}>
                  <div onClick={() => toggle(cs.id)} style={{ padding: "28px 32px 24px", borderBottom: "0.5px solid var(--border-color)", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 16, cursor: "pointer", background: isOpen ? "var(--bg-secondary)" : "var(--bg-primary)", transition: "background 0.15s" }}>
                    <div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-text)", background: "var(--accent-bg)", border: "0.5px solid var(--accent)", borderRadius: 3, padding: "3px 8px", display: "inline-block", marginBottom: 12 }}>{cs.tag}</span>
                      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 6 }}>{cs.title}</h2>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 300 }}>{cs.sub}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14 }}>
                        {cs.stack?.map((s: string) => (
                          <span key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--text-secondary)", background: "var(--bg-secondary)", border: "0.5px solid var(--border-color)", borderRadius: 3, padding: "2px 7px" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <button style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", border: "0.5px solid var(--border-color)", borderRadius: 4, padding: "6px 12px", background: "none", cursor: "pointer", flexShrink: 0, marginTop: 4 }}>
                      {isOpen ? "Collapse ↑" : "Expand ↓"}
                    </button>
                  </div>
                  {isOpen && (
                    <>
                      <ArchDiagram rows={cs.archRows} colors={cs.archColors} />
                      <div className="cs-panel-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border-color)" }}>
                        {cs.panels?.map((panel: any) => (
                          <div key={panel.label} style={{ background: "var(--bg-primary)", padding: "22px 26px" }}>
                            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>{panel.label}</p>
                            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300 }}>
                              {panel.content.split(new RegExp(`(${panel.highlight.join("|")})`)).map((part: string, i: number) =>
                                panel.highlight.includes(part) ? <Mono key={i}>{part}</Mono> : part
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: "var(--bg-primary)", padding: "22px 26px", borderTop: "0.5px solid var(--border-color)" }}>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Key decisions</p>
                        <DecisionTable rows={cs.decisions} />
                      </div>
                      <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${cs.metrics.length},1fr)`, gap: "1px", background: "var(--border-color)", borderTop: "0.5px solid var(--border-color)" }}>
                        {cs.metrics?.map((m: any) => (
                          <div key={m.label} style={{ background: "var(--bg-primary)", padding: "18px 20px", textAlign: "center" }}>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>{m.val}</div>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 5 }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>

          <SectionLabel text="Tech radar" />
          <div className="radar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "var(--border-color)", border: "0.5px solid var(--border-color)", borderRadius: 14, overflow: "hidden", marginBottom: 72 }}>
            {Object.entries(system.techRadar || {}).map(([zone, items]: [string, any]) => (
              <div key={zone} style={{ background: "var(--bg-primary)", padding: "20px 18px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14, paddingBottom: 10, borderBottom: "0.5px solid var(--border-color)" }}>
                  <span style={{ color: RADAR_COLORS[zone] }}>●</span> {zone}
                </div>
                {items.map((item: string) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9, fontSize: 12, color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: RADAR_COLORS[zone], flexShrink: 0, display: "block" }} />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <SectionLabel text="Scalability patterns I apply" />
          <div className="scale-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {system.scalePatterns?.map((p: any) => (
              <div key={p.title} style={{ border: "0.5px solid var(--border-color)", borderRadius: 12, padding: "22px 24px", background: "var(--bg-primary)" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: p.tagColor, marginBottom: 12, display: "inline-block" }}>{p.tag}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.01em" }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, fontWeight: 300 }}>{p.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}

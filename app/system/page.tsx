"use client";

import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    num: "01",
    title: "Isolation over convenience",
    desc: "Every tenant gets schema-level isolation. Shared tables with a tenant_id column is a time bomb — one bad query leaks data. Row-level security adds cognitive overhead. Separate schemas make the blast radius explicit.",
  },
  {
    num: "02",
    title: "Validate at the boundary",
    desc: "Data contracts live at the API layer. Zod schemas on every request input. If it makes it past the controller, it's clean. Deep validation inside services is a symptom of not trusting your own API layer.",
  },
  {
    num: "03",
    title: "Cache reads, not writes",
    desc: "Redis sits in front of expensive reads only. Write-through caching without careful invalidation creates stale state bugs that are nearly impossible to reproduce. Cache invalidation is hard — scope it narrowly.",
  },
];

const CASE_STUDIES = [
  {
    id: "cs1",
    tag: "Case study 01",
    title: "Multi-Tenant School Management System",
    sub: "Schema-per-tenant PostgreSQL · Redis read cache · Role-based access · 3 roles, 12 modules",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis", "Docker"],
    archRows: [
      ["Browser / Mobile", "Next.js API Routes", "Auth Middleware", "Service Layer"],
      ["Redis Cache", "Prisma ORM", "PG: tenant_[id] schema"],
    ],
    archColors: [
      ["client", "gateway", "service", "service"],
      ["infra", "db", "db"],
    ],
    panels: [
      {
        label: "Problem",
        content: `A single school app needed to serve multiple independent institutions — each with its own staff, students, fee structures, and academic calendar. The core constraint: zero data leakage between tenants, even under misconfigured queries. A shared-table approach with tenant_id would require every query to carry a WHERE clause that could be accidentally omitted.`,
        highlight: ["multiple independent institutions", "zero data leakage between tenants"],
      },
      {
        label: "Architecture decision",
        content: `Chose PostgreSQL schema-per-tenant over shared tables or separate databases. Each school gets its own PG schema (e.g. tenant_rgd, tenant_dav). Prisma connects with a dynamic schema prefix. A connection pool middleware resolves the active schema from the JWT tenant claim before any query executes. Physical isolation without the cost of separate DB instances.`,
        highlight: ["PostgreSQL schema-per-tenant", "tenant_rgd", "tenant_dav"],
      },
      {
        label: "Scaling strategy",
        content: `Horizontal scaling is safe because all state lives in Postgres + Redis, not in-process. New tenants = new schema + migration run, no code change. Redis caches heavy reads (student lists, fee summaries) with TTL-based invalidation keyed per tenant. Background jobs handle bulk operations via a queue to avoid blocking the request thread.`,
        highlight: ["TTL-based invalidation"],
      },
      {
        label: "Challenges faced",
        content: `Prisma doesn't natively support runtime schema switching. Solved by injecting a raw SET search_path statement at the connection level inside a custom middleware before every query batch. Early builds had a global Redis flush on any mutation — replaced with namespaced keys (tenant:{id}:fees:{month}) so mutations only invalidate the affected tenant's affected resource.`,
        highlight: ["SET search_path", "tenant:{id}:fees:{month}"],
      },
    ],
    decisions: [
      { decision: "Tenancy model", chosen: "Schema-per-tenant", rejected: "Row-level tenant_id" },
      { decision: "ORM", chosen: "Prisma + raw SQL", rejected: "Knex (too low-level)" },
      { decision: "Auth", chosen: "JWT + tenant claim", rejected: "Session cookies" },
      { decision: "Cache layer", chosen: "Redis read-through", rejected: "In-memory (no persistence)" },
    ],
    metrics: [
      { val: "3", label: "User roles" },
      { val: "12", label: "API modules" },
      { val: "<80ms", label: "Cached reads" },
      { val: "∞", label: "Tenant scale" },
    ],
  },
  {
    id: "cs2",
    tag: "Case study 02",
    title: "Plugin-Based DAO Governance Framework",
    sub: "Solana · Anchor · Snapshot voting · Dynamic quorum · Extensible plugin architecture",
    stack: ["Rust", "Solana", "Anchor", "TypeScript", "Web3.js"],
    archRows: [
      ["DAO Client", "Core Program", "Plugin Registry"],
      ["Voting Plugin", "Proposal Accounts", "IPFS Archive"],
    ],
    archColors: [
      ["client", "gateway", "service"],
      ["service", "db", "infra"],
    ],
    panels: [
      {
        label: "Problem",
        content: `Existing Solana governance programs hardcode voting logic. Adding quadratic voting or delegation requires a full program redeploy — a breaking change for any DAO already using the contract. The design constraint: governance logic must be swappable without migrating state.`,
        highlight: ["governance logic must be swappable without migrating state"],
      },
      {
        label: "Architecture decision",
        content: `A core program handles proposal lifecycle, account state, and execution. Voting logic lives in separate plugin programs that the core CPI-calls at vote time. The core stores a plugin_program_id on each realm — pointing to whichever voting plugin is active. Swapping governance = one config update, zero migration.`,
        highlight: ["plugin_program_id", "zero migration"],
      },
      {
        label: "Key technical constraints",
        content: `Solana CPI depth limits cross-program invocations to 4 levels. Plugin architecture must stay within this. Account size limits (10MB max) mean proposal accounts store only a hash of the vote record, not the full voter list. Snapshot timing is critical — vote weight captured at proposal creation prevents token whale manipulation.`,
        highlight: ["4 levels", "10MB max"],
      },
      {
        label: "Scaling strategy",
        content: `On-chain storage is expensive on Solana. Vote records are archived off-chain (IPFS) after proposal closure, with only the final tally stored on-chain. Dynamic quorum adjusts based on total circulating supply at snapshot time — no manual governor intervention needed as token supply changes.`,
        highlight: ["Vote records are archived off-chain (IPFS)", "Dynamic quorum"],
      },
    ],
    decisions: [
      { decision: "Voting logic", chosen: "Separate plugin programs", rejected: "Hardcoded in core" },
      { decision: "Vote storage", chosen: "IPFS archive + hash", rejected: "Full on-chain records" },
      { decision: "Quorum", chosen: "Dynamic (supply-based)", rejected: "Static threshold" },
      { decision: "State migration", chosen: "Plugin swap = zero migration", rejected: "Redeploy + migrate" },
    ],
    metrics: [
      { val: "4", label: "CPI depth max" },
      { val: "∞", label: "Plugin slots" },
      { val: "0", label: "State migrations" },
      { val: "IPFS", label: "Vote archive" },
    ],
  },
];

const TECH_RADAR = {
  Adopt: ["TypeScript", "PostgreSQL", "Redis", "Prisma ORM", "Next.js API", "Docker"],
  Trial: ["BullMQ", "Turborepo", "tRPC", "Drizzle ORM", "Hono.js"],
  Assess: ["NATS JetStream", "ClickHouse", "CockroachDB", "EdgeDB", "Temporal.io"],
  Hold: ["REST (complex APIs)", "MongoDB", "GraphQL", "Microservices-early"],
};

const RADAR_COLORS: Record<string, string> = {
  Adopt: "var(--accent-text)",
  Trial: "var(--accent)",
  Assess: "var(--accent-text)",
  Hold: "var(--text-muted)",
};

const SCALE_PATTERNS = [
  {
    tag: "Cache layer",
    tagColor: "var(--accent-text)",
    title: "Namespaced Redis TTL caching",
    desc: "Every cached key is namespaced by tenant + resource + time window. Mutations trigger targeted invalidation — never a full flush. TTL acts as the final safety net, not the primary mechanism.",
  },
  {
    tag: "Queue",
    tagColor: "var(--accent-text)",
    title: "Background job offloading",
    desc: "Bulk operations (monthly fee generation, result publishing, notifications) are enqueued via BullMQ, not executed in the request thread. The HTTP response returns immediately; the job runs async with retry logic.",
  },
  {
    tag: "Data layer",
    tagColor: "var(--accent-text)",
    title: "Read replicas for heavy queries",
    desc: "Report generation and analytics queries route to a read replica. Write traffic never competes with dashboard reads. Prisma handles replica routing via datasource configuration.",
  },
  {
    tag: "Infra",
    tagColor: "var(--accent-text)",
    title: "Stateless app servers",
    desc: "No session state in memory. JWT carries all auth context. All shared state lives in Redis or Postgres. Horizontal scaling is a Docker replica count change — no sticky sessions, no coordination overhead.",
  },
];

// ─── NODE COLOR MAP ───────────────────────────────────────────────────────────

const NODE_STYLES: Record<string, string> = {
  client:  "color:var(--accent-text);background:var(--accent-bg);borderColor:var(--accent)",
  gateway: "color:var(--accent-text);background:var(--accent-bg);borderColor:var(--accent)",
  service: "color:var(--accent-text);background:var(--accent-bg);borderColor:var(--accent)",
  infra:   "color:var(--icon-color);background:var(--accent-bg);borderColor:var(--accent)",
  db:      "color:var(--accent-text);background:var(--accent-bg);borderColor:var(--accent)",
};

// ─── SUB COMPONENTS ──────────────────────────────────────────────────────────

function Mono({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: color ?? "var(--icon-color)" }}>
      {children}
    </span>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
        {text}
      </span>
      <div style={{ flex: 1, height: "0.5px", background: "var(--border-color)" }} />
    </div>
  );
}

function ArchDiagram({ rows, colors }: { rows: string[][]; colors: string[][] }) {
  return (
    <div style={{ padding: "22px 28px", borderTop: "0.5px solid var(--border-color)", background: "var(--bg-primary)" }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
        Architecture flow
      </p>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6, paddingLeft: ri === 1 ? 160 : 0 }}>
          {row.map((node, ni) => (
            <>
              <span
                key={ni}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "0.5px solid",
                  whiteSpace: "nowrap",
                  ...Object.fromEntries(
                    NODE_STYLES[colors[ri][ni]].split(";").map((s) => {
                      const [k, v] = s.split(":");
                      return [k.trim(), v?.trim()];
                    })
                  ),
                }}
              >
                {node}
              </span>
              {ni < row.length - 1 && (
                <span key={`arrow-${ni}`} style={{ color: "var(--text-muted)", fontSize: 12 }}>→</span>
              )}
            </>
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
            <th key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", padding: "8px 10px", textAlign: "left", borderBottom: "0.5px solid var(--border-color)" }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.decision}>
            <td style={{ padding: "9px 10px", borderBottom: "0.5px solid var(--border-subtle)", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace", fontSize: 10, whiteSpace: "nowrap", verticalAlign: "top" }}>
              {r.decision}
            </td>
            <td style={{ padding: "9px 10px", borderBottom: "0.5px solid var(--border-subtle)", verticalAlign: "top" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", padding: "2px 7px", borderRadius: 3, color: "var(--accent-text)", background: "rgba(52,211,153,0.1)", border: "0.5px solid var(--accent)" }}>
                {r.chosen}
              </span>
            </td>
            <td style={{ padding: "9px 10px", borderBottom: "0.5px solid var(--border-subtle)", verticalAlign: "top" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", padding: "2px 7px", borderRadius: 3, color: "var(--accent-text)", background: "var(--accent-bg)", border: "0.5px solid var(--accent)" }}>
                {r.rejected}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function SystemsPage() {
  const [openCS, setOpenCS] = useState<string | null>(null);

  const toggle = (id: string) => setOpenCS((prev) => (prev === id ? null : id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        .cs-panel-grid { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .cs-panel-grid { grid-template-columns: 1fr; } .scale-grid { grid-template-columns: 1fr !important; } .radar-grid { grid-template-columns: 1fr 1fr !important; } .principles-grid { grid-template-columns: 1fr !important; } .metrics-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>

       <main style={{ minHeight: "100vh", paddingTop: "56px", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", transition: "background-color 0.3s ease, color 0.3s ease", fontFamily: "'Space Grotesk', sans-serif" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 80px" }}>

          {/* ── HEADER ── */}
          <div style={{ padding: "64px 0 48px", borderBottom: "0.5px solid var(--border-color)", marginBottom: 60 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              <span style={{ width: 20, height: "0.5px", background: "var(--text-muted)", display: "block" }} />
              Engineering Systems
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px,6vw,76px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.035em", color: "var(--text-primary)" }}>
              How I{" "}
              <span style={{ WebkitTextStroke: "1.2px var(--stroke)", color: "transparent" }}>
                architect
              </span>
              <br />
              and ship systems
            </h1>
            <p style={{ marginTop: 20, maxWidth: 520, fontSize: 15, color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.75 }}>
              Not UI mockups — real backend decisions, architecture tradeoffs, and the constraints that shaped every choice.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Multi-tenant architecture", "Distributed systems", "Production-grade APIs", "Redis caching", "PostgreSQL at scale"].map((t) => (
                <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 4, border: "0.5px solid var(--border-color)", color: "var(--text-secondary)", background: "var(--bg-secondary)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── PRINCIPLES ── */}
          <SectionLabel text="Engineering principles" />
          <div className="principles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "var(--border-color)", border: "0.5px solid var(--border-color)", borderRadius: 14, overflow: "hidden", marginBottom: 72 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.num} style={{ background: "var(--bg-primary)", padding: 24 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 14 }}>{p.num}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.01em" }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, fontWeight: 300 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* ── CASE STUDIES ── */}
          <SectionLabel text="System case studies" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 72 }}>
            {CASE_STUDIES.map((cs) => {
              const isOpen = openCS === cs.id;
              return (
                <article key={cs.id} style={{ border: `0.5px solid ${isOpen ? "var(--border-color)" : "var(--border-color)"}`, borderRadius: 20, overflow: "hidden", transition: "border-color 0.15s" }}>

                  {/* Header */}
                  <div
                    onClick={() => toggle(cs.id)}
                    style={{ padding: "28px 32px 24px", borderBottom: "0.5px solid var(--border-color)", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 16, cursor: "pointer", background: isOpen ? "var(--bg-secondary)" : "#09090b", transition: "background 0.15s" }}
                  >
                    <div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-text)", background: "var(--accent-bg)", border: "0.5px solid var(--accent)", borderRadius: 3, padding: "3px 8px", display: "inline-block", marginBottom: 12 }}>
                        {cs.tag}
                      </span>
                      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 6 }}>{cs.title}</h2>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 300 }}>{cs.sub}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14 }}>
                        {cs.stack.map((s) => (
                          <span key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--text-secondary)", background: "var(--bg-secondary)", border: "0.5px solid var(--border-color)", borderRadius: 3, padding: "2px 7px" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <button style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", border: "0.5px solid var(--border-color)", borderRadius: 4, padding: "6px 12px", background: "none", cursor: "pointer", flexShrink: 0, marginTop: 4 }}>
                      {isOpen ? "Collapse ↑" : "Expand ↓"}
                    </button>
                  </div>

                  {/* Body */}
                  {isOpen && (
                    <>
                      <ArchDiagram rows={cs.archRows} colors={cs.archColors} />

                      {/* 4 panels */}
                      <div className="cs-panel-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border-color)" }}>
                        {cs.panels.map((panel) => (
                          <div key={panel.label} style={{ background: "var(--bg-primary)", padding: "22px 26px" }}>
                            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>{panel.label}</p>
                            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 300 }}>
                              {panel.content.split(new RegExp(`(${panel.highlight.join("|")})`)).map((part, i) =>
                                panel.highlight.includes(part) ? <Mono key={i}>{part}</Mono> : part
                              )}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Decision table */}
                      <div style={{ background: "var(--bg-primary)", padding: "22px 26px", borderTop: "0.5px solid var(--border-color)" }}>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Key decisions</p>
                        <DecisionTable rows={cs.decisions} />
                      </div>

                      {/* Metrics */}
                      <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${cs.metrics.length},1fr)`, gap: "1px", background: "var(--border-color)", borderTop: "0.5px solid var(--border-color)" }}>
                        {cs.metrics.map((m) => (
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

          {/* ── TECH RADAR ── */}
          <SectionLabel text="Tech radar" />
          <div className="radar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "var(--border-color)", border: "0.5px solid var(--border-color)", borderRadius: 14, overflow: "hidden", marginBottom: 72 }}>
            {Object.entries(TECH_RADAR).map(([zone, items]) => (
              <div key={zone} style={{ background: "var(--bg-primary)", padding: "20px 18px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14, paddingBottom: 10, borderBottom: "0.5px solid var(--border-color)" }}>
                  <span style={{ color: RADAR_COLORS[zone] }}>●</span>{" "}{zone}
                </div>
                {items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9, fontSize: 12, color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: RADAR_COLORS[zone], flexShrink: 0, display: "block" }} />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ── SCALING PATTERNS ── */}
          <SectionLabel text="Scalability patterns I apply" />
          <div className="scale-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {SCALE_PATTERNS.map((p) => (
              <div key={p.title} style={{ border: "0.5px solid var(--border-color)", borderRadius: 12, padding: "22px 24px", background: "var(--bg-primary)", transition: "border-color 0.15s" }}>
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
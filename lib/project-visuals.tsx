import type { Project } from '@/types'

const CYAN = '#00F5FF'
const PURPLE = '#7B2FFF'
const BLUE = '#3B82F6'
const PINK = '#EC4899'

interface VisualProps {
  className?: string
}

type Visual = React.ComponentType<VisualProps>

function GridDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={CYAN} />
        <stop offset="100%" stopColor={PURPLE} />
      </linearGradient>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#141430" />
        <stop offset="100%" stopColor="#0a0a14" />
      </linearGradient>
      <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
      </pattern>
      <radialGradient id={`${id}-glow`} cx="0.5" cy="0.4" r="0.6">
        <stop offset="0%" stopColor={CYAN} stopOpacity="0.22" />
        <stop offset="100%" stopColor={PURPLE} stopOpacity="0.04" />
      </radialGradient>
    </defs>
  )
}

function Shell({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img">
      <rect width="400" height="220" fill={`url(#${id}-bg)`} />
      <rect width="400" height="220" fill={`url(#${id}-grid)`} />
      <rect width="400" height="220" fill={`url(#${id}-glow)`} />
      {children}
    </svg>
  )
}

/* ── CareerNorth: resume doc + ATS score pipeline ── */
function CareerNorthVisual() {
  const id = 'cn'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g opacity="0.9">
        <rect x="120" y="34" width="160" height="152" rx="10" fill="#0e0e1c" stroke={`url(#${id}-accent)`} strokeWidth="1.5" />
        <line x1="142" y1="62" x2="258" y2="62" stroke={CYAN} strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
        <line x1="142" y1="82" x2="258" y2="82" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
        <line x1="142" y1="98" x2="220" y2="98" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
        <rect x="142" y="116" width="76" height="12" rx="6" fill={CYAN} fillOpacity="0.14" stroke={CYAN} strokeOpacity="0.5" strokeWidth="1" />
        <text x="142" y="126" fontFamily="monospace" fontSize="8" fill={CYAN} opacity="0.9">ATS 92</text>
        <path d="M 200 178 l 8 8 16 -16" fill="none" stroke={PURPLE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="90" cy="60" r="20" fill="none" stroke={CYAN} strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="80" y1="60" x2="100" y2="60" stroke={CYAN} strokeOpacity="0.6" strokeWidth="2" />
        <line x1="90" y1="50" x2="90" y2="70" stroke={CYAN} strokeOpacity="0.6" strokeWidth="2" />
        <path d="M 310 70 l 0 26 m -13 -13 l 26 0" stroke={PURPLE} strokeOpacity="0.7" strokeWidth="2" />
        <circle cx="310" cy="120" r="4" fill={PURPLE} />
        <circle cx="310" cy="150" r="4" fill={CYAN} />
        <circle cx="310" cy="180" r="4" fill={PURPLE} />
      </g>
    </Shell>
  )
}

/* ── RepoLens: force-directed dependency graph ── */
function RepoLensVisual() {
  const id = 'rl'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g stroke={CYAN} strokeOpacity="0.35" strokeWidth="1.2">
        <line x1="200" y1="110" x2="110" y2="55" />
        <line x1="200" y1="110" x2="80" y2="150" />
        <line x1="200" y1="110" x2="290" y2="60" />
        <line x1="200" y1="110" x2="315" y2="155" />
        <line x1="200" y1="110" x2="200" y2="185" />
        <line x1="110" y1="55" x2="290" y2="60" />
        <line x1="80" y1="150" x2="315" y2="155" />
      </g>
      <circle cx="200" cy="110" r="26" fill="#0e0e1c" stroke={`url(#${id}-accent)`} strokeWidth="2" />
      <circle cx="200" cy="110" r="6" fill={CYAN} />
      {[
        [110, 55, BLUE],
        [80, 150, PURPLE],
        [290, 60, PURPLE],
        [315, 155, BLUE],
        [200, 185, PINK],
      ].map((node: (number | string)[], i: number) => {
        const [cx, cy, c] = node as [number, number, string]
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="16" fill="#0e0e1c" stroke={c} strokeOpacity="0.8" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="4" fill={c} />
          </g>
        )
      })}
      <g fontFamily="monospace" fontSize="9" fill="#ffffff" opacity="0.4">
        <text x="104" y="52">src</text>
        <text x="290" y="57">api</text>
        <text x="190" y="106">core</text>
      </g>
    </Shell>
  )
}

/* ── Shelf: design system components ── */
function ShelfVisual() {
  const id = 'sh'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g>
        <rect x="40" y="36" width="150" height="74" rx="8" fill="#0e0e1c" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
        <rect x="54" y="50" width="30" height="10" rx="5" fill={BLUE} />
        <rect x="90" y="50" width="30" height="10" rx="5" fill="none" stroke={BLUE} strokeOpacity="0.7" strokeWidth="1.2" />
        <rect x="54" y="72" width="44" height="8" rx="4" fill={PURPLE} fillOpacity="0.6" />
        <rect x="54" y="88" width="80" height="8" rx="4" fill={CYAN} fillOpacity="0.25" stroke={CYAN} strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="150" cy="55" r="6" fill="none" stroke={PURPLE} strokeWidth="2" />
        <circle cx="150" cy="80" r="6" fill={CYAN} fillOpacity="0.3" stroke={CYAN} strokeWidth="2" />
      </g>
      <g>
        <rect x="210" y="36" width="150" height="74" rx="8" fill="#0e0e1c" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
        <rect x="224" y="50" width="60" height="8" rx="4" fill={CYAN} fillOpacity="0.4" />
        <rect x="224" y="66" width="80" height="8" rx="4" fill="#ffffff" fillOpacity="0.15" />
        <rect x="224" y="82" width="120" height="14" rx="7" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx="244" cy="89" r="4" fill={PURPLE} />
        <rect x="224" y="50" width="6" height="42" rx="3" fill={PURPLE} fillOpacity="0.8" />
      </g>
      <g>
        <rect x="120" y="130" width="160" height="52" rx="8" fill="#0e0e1c" stroke={`url(#${id}-accent)`} strokeWidth="1.2" />
        <text x="136" y="152" fontFamily="monospace" fontSize="10" fill={CYAN}>npm i @shelf/ui</text>
        <rect x="136" y="164" width="70" height="12" rx="6" fill={PURPLE} />
        <text x="146" y="173" fontFamily="monospace" fontSize="7" fill="#fff" opacity="0.9">Tree-shake</text>
      </g>
    </Shell>
  )
}

/* ── Astra: terminal AI agent ── */
function AstraVisual() {
  const id = 'as'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <rect x="70" y="40" width="260" height="140" rx="10" fill="#0b0b18" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.2" />
      <g>
        <circle cx="90" cy="56" r="4" fill="#ff5f57" />
        <circle cx="106" cy="56" r="4" fill="#febc2e" />
        <circle cx="122" cy="56" r="4" fill="#28c840" />
        <text x="150" y="60" fontFamily="monospace" fontSize="9" fill="#ffffff" opacity="0.4">astra — agent</text>
      </g>
      <g fontFamily="monospace" fontSize="12">
        <text x="90" y="90" fill={CYAN}>&gt; astra plan</text>
        <text x="90" y="112" fill="#ffffff" opacity="0.7">  · explore filesystem</text>
        <text x="90" y="130" fill="#ffffff" opacity="0.7">  · implement feature ✓</text>
        <text x="90" y="148" fill={PURPLE}>  · run tests ✓</text>
        <text x="90" y="166" fill="#ffffff" opacity="0.35">▌</text>
      </g>
      <g>
        <path d="M 336 40 l 22 14 l -22 14 z" fill="none" stroke={PURPLE} strokeWidth="1.5" />
        <circle cx="336" cy="54" r="3" fill={PURPLE} />
      </g>
      <path d="M 30 150 l 24 6 l 8 22 l 10 -18 l 18 -10 l -22 -8 l -6 -24 l -10 20 z" fill={CYAN} fillOpacity="0.12" stroke={CYAN} strokeWidth="1.2" />
    </Shell>
  )
}

/* ── RGD School / KakshaOne: school building ── */
function SchoolVisual() {
  const id = 'sc'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <path d="M 200 40 L 330 84 L 200 118 L 70 84 Z" fill={PURPLE} fillOpacity="0.10" stroke={`url(#${id}-accent)`} strokeWidth="1.5" />
      <rect x="96" y="92" width="208" height="96" rx="6" fill="#0e0e1c" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.2" />
      <g fill="#ffffff" opacity="0.35">
        <rect x="112" y="108" width="34" height="34" rx="3" />
        <rect x="158" y="108" width="34" height="34" rx="3" />
        <rect x="204" y="108" width="34" height="34" rx="3" />
        <rect x="250" y="108" width="34" height="34" rx="3" />
      </g>
      <rect x="112" y="148" width="172" height="40" rx="4" fill="none" stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.2" />
      <path d="M 158 88 L 158 74 M 204 88 L 204 74 M 250 88 L 250 74" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
      <g>
        <path d="M 288 92 q 0 -16 14 -16 q 14 0 14 16" fill="none" stroke={BLUE} strokeWidth="2.5" />
        <rect x="302" y="100" width="0" height="0" />
        <path d="M 288 92 h 28 M 296 92 v -10 a 6 6 0 0 1 12 0 v 10" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1.5" />
      </g>
    </Shell>
  )
}

/* ── NexPay: credit card + ledger arrows ── */
function NexPayVisual() {
  const id = 'np'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g transform="rotate(-8 200 110)">
        <rect x="80" y="70" width="240" height="150" rx="14" fill="#0e0e1c" stroke={`url(#${id}-accent)`} strokeWidth="1.6" />
        <rect x="104" y="96" width="64" height="10" rx="5" fill={CYAN} fillOpacity="0.7" />
        <line x1="104" y1="126" x2="296" y2="126" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="3" />
        <text x="104" y="164" fontFamily="monospace" fontSize="12" letterSpacing="3" fill="#ffffff" opacity="0.85">•••• •••• •••• 4242</text>
        <rect x="104" y="186" width="42" height="14" rx="7" fill={PURPLE} />
        <rect x="154" y="186" width="42" height="14" rx="7" fill="none" stroke={PURPLE} strokeOpacity="0.6" strokeWidth="1.2" />
        <circle cx="286" cy="186" r="10" fill="none" stroke={PURPLE} strokeWidth="2" />
        <path d="M 282 186 h 8 m -4 -4 v 8" stroke={PURPLE} strokeWidth="2" />
      </g>
      <path d="M 52 70 l -10 8 l 18 2 l -2 -18 l -8 8 m 44 6 l -14 -16" fill="none" stroke={CYAN} strokeOpacity="0.6" strokeWidth="1.5" />
      <circle cx="44" cy="64" r="3" fill={CYAN} />
      <circle cx="366" cy="80" r="3" fill={PURPLE} />
      <path d="M 366 80 l -14 12" stroke={PURPLE} strokeOpacity="0.5" strokeWidth="1.5" />
    </Shell>
  )
}

/* ── FlowForge: DAG workflow ── */
function FlowForgeVisual() {
  const id = 'ff'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g stroke={CYAN} strokeOpacity="0.45" strokeWidth="1.6" fill="none">
        <path d="M 84 52 H 132" />
        <path d="M 168 52 H 216" />
        <path d="M 252 52 H 300" />
        <path d="M 192 108 H 240" />
        <path d="M 168 52 V 108 H 240" />
        <path d="M 192 108 H 300" />
        <path d="M 168 52 L 192 108 M 216 52 L 240 108" />
      </g>
      {[
        [48, 52, 'Start', CYAN],
        [132, 52, 'Webhook', BLUE],
        [216, 52, 'Filter', PURPLE],
        [300, 52, 'HTTP', BLUE],
        [240, 108, 'Email', PURPLE],
      ].map((node: (number | string)[], i: number) => {
        const [x, y, label, c] = node as [number, number, string, string]
        return (
          <g key={i}>
            <rect x={x} y={y} width="48" height="30" rx="7" fill="#0e0e1c" stroke={c} strokeWidth="1.4" />
            <text x={Number(x) + 24} y={Number(y) + 18} textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#fff" opacity="0.75">{label}</text>
          </g>
        )
      })}
      <rect x="48" y="150" width="304" height="40" rx="8" fill="#0e0e1c" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
      <g fontFamily="monospace" fontSize="9" fill="#ffffff" opacity="0.6">
        <text x="66" y="174">exec 8f3a · running</text>
        <rect x="228" y="164" width="60" height="8" rx="4" fill={CYAN} fillOpacity="0.3" />
        <rect x="228" y="164" width="34" height="8" rx="4" fill={CYAN} />
        <text x="296" y="174" fill={CYAN}>3/5</text>
      </g>
    </Shell>
  )
}

/* ── TaskMesh: kanban board ── */
function TaskMeshVisual() {
  const id = 'tm'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      {[
        { x: 60, c: CYAN },
        { x: 170, c: PURPLE },
        { x: 280, c: BLUE },
      ].map((col, i) => (
        <g key={i}>
          <rect x={col.x} y="42" width="92" height="140" rx="8" fill="#0e0e1c" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
          <line x1={col.x + 10} y1="58" x2={col.x + 82} y2="58" stroke={col.c} strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x={col.x + 10} y="70" width="72" height="16" rx="4" fill={col.c} fillOpacity="0.12" stroke={col.c} strokeOpacity="0.45" strokeWidth="1" />
          <rect x={col.x + 10} y="94" width="72" height="16" rx="4" fill="#ffffff" fillOpacity="0.07" />
          <rect x={col.x + 10} y="118" width="72" height="16" rx="4" fill="#ffffff" fillOpacity="0.07" />
          <rect x={col.x + 10} y="142" width="42" height="16" rx="4" fill={PURPLE} fillOpacity="0.2" />
        </g>
      ))}
      <g stroke={CYAN} strokeOpacity="0.5" strokeWidth="1.4">
        <path d="M 116 52 L 152 24 l 22 14" fill="none" />
        <circle cx="152" cy="24" r="3" fill={CYAN} />
      </g>
      <text x="200" y="196" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ffffff" opacity="0.35">3 users editing live</text>
    </Shell>
  )
}

/* ── throttleGate: gateway funnel + circuit breaker ── */
function ThrottleGateVisual() {
  const id = 'tg'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <path d="M 120 44 L 200 44 L 168 90 H 152 L 120 44 Z" fill={CYAN} fillOpacity="0.15" stroke={CYAN} strokeWidth="1.4" />
      <path d="M 152 90 H 168 L 154 124 H 166 L 200 176 H 120 L 154 124 H 166" fill="none" stroke={`url(#${id}-accent)`} strokeWidth="1.4" />
      <path d="M 92 74 H 120 M 120 100 H 96 M 120 150 H 108" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="3 4" />
      <g transform="translate(246 120)">
        <circle r="34" fill="none" stroke={PURPLE} strokeOpacity="0.5" strokeWidth="3" strokeDasharray="4 6" transform="rotate(-90)" />
        <circle r="34" fill="none" stroke={PURPLE} strokeWidth="3" strokeDasharray="170 214" strokeLinecap="round" transform="rotate(-90)" />
        <path d="M 0 -24 v 24 l 16 10" fill="none" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
        <text x="0" y="6" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff" opacity="0.8">4.5k/s</text>
      </g>
      <g transform="translate(320 60)">
        <rect x="-8" y="-8" width="16" height="16" rx="3" fill={PURPLE} fillOpacity="0.25" stroke={PURPLE} strokeWidth="1.2" />
      </g>
      <g transform="translate(320 100)">
        <rect x="-8" y="-8" width="16" height="16" rx="3" fill={CYAN} fillOpacity="0.25" stroke={CYAN} strokeWidth="1.2" />
      </g>
      <g transform="translate(320 140)">
        <rect x="-8" y="-8" width="16" height="16" rx="3" fill={BLUE} fillOpacity="0.25" stroke={BLUE} strokeWidth="1.2" />
      </g>
    </Shell>
  )
}

/* ── Aptiq: launch boxes ── */
function AptiqVisual() {
  const id = 'aq'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g>
        <rect x="70" y="100" width="60" height="60" rx="6" fill="#0e0e1c" stroke={BLUE} strokeOpacity="0.7" strokeWidth="1.4" />
        <rect x="150" y="88" width="60" height="60" rx="6" fill="#0e0e1c" stroke={CYAN} strokeOpacity="0.7" strokeWidth="1.4" />
        <rect x="230" y="100" width="60" height="60" rx="6" fill="#0e0e1c" stroke={PURPLE} strokeOpacity="0.7" strokeWidth="1.4" />
      </g>
      <g stroke={CYAN} strokeOpacity="0.5" strokeWidth="1.4">
        <line x1="130" y1="130" x2="150" y2="118" />
        <line x1="210" y1="118" x2="230" y2="130" />
      </g>
      <g transform="translate(200 60)">
        <path d="M 0 16 L 0 4 L 12 4 L 12 16 L 16 12 L 22 20 L 16 28 L 12 24 L 12 36 L 0 36 L 0 24 L -4 28 L -10 20 L -4 12 Z" fill={PURPLE} fillOpacity="0.3" stroke={PURPLE} strokeWidth="1.4" />
        <path d="M -2 20 L 2 20 M -2 22 L 2 22" stroke={CYAN} strokeWidth="1.2" />
      </g>
      <path d="M 88 180 h 24 m -12 -12 v 24" stroke={PURPLE} strokeOpacity="0.7" strokeWidth="1.6" />
      <path d="M 288 180 h 24 m -12 -12 v 24" stroke={CYAN} strokeOpacity="0.7" strokeWidth="1.6" />
      <text x="200" y="204" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#fff" opacity="0.35">auth · db · deploy</text>
    </Shell>
  )
}

/* ── Glyphcast: ASCII pixel grid ── */
function GlyphcastVisual() {
  const id = 'gc'
  const glyphs = ['@', '#', '%', 'S', '?', '*', '+', ';', ':', ',', '.']
  const rows = 12
  const cols = 26
  const cellX = 400 / cols
  const cellY = 220 / rows
  const cells: React.ReactNode[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = (r + c) % 11
      const alpha = 0.1 + 0.7 * (1 - Math.abs(v - 5) / 5)
      const hue = v < 4 ? CYAN : v < 8 ? PURPLE : BLUE
      cells.push(
        <text
          key={`${r}-${c}`}
          x={c * cellX + cellX / 2}
          y={r * cellY + cellY / 2 + 3}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="9"
          fill={hue}
          opacity={alpha}
        >
          {glyphs[v]}
        </text>,
      )
    }
  }
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g>
        <path d="M 60 50 h 280 M 60 170 h 280" stroke={CYAN} strokeOpacity="0.2" strokeWidth="1" />
        <text x="60" y="34" fontFamily="monospace" fontSize="9" fill={CYAN} opacity="0.8">◀ ▶  ASCII · LIVE</text>
        {cells}
        <rect x="330" y="186" width="46" height="14" rx="7" fill={PURPLE} fillOpacity="0.25" stroke={PURPLE} strokeWidth="1" />
        <text x="353" y="196" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#fff" opacity="0.8">EXPORT</text>
      </g>
    </Shell>
  )
}

/* ── Techies Community: network of members ── */
function CommunityVisual() {
  const id = 'tc'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g stroke={CYAN} strokeOpacity="0.3" strokeWidth="1.1">
        <line x1="140" y1="70" x2="260" y2="70" />
        <line x1="200" y1="50" x2="200" y2="150" />
        <line x1="140" y1="70" x2="200" y2="150" />
        <line x1="260" y1="70" x2="200" y2="150" />
        <line x1="140" y1="70" x2="100" y2="160" />
        <line x1="260" y1="70" x2="300" y2="160" />
        <line x1="100" y1="160" x2="200" y2="150" />
        <line x1="300" y1="160" x2="200" y2="150" />
      </g>
      {[
        [140, 70, BLUE],
        [200, 50, CYAN],
        [260, 70, PURPLE],
        [200, 150, CYAN],
        [100, 160, BLUE],
        [300, 160, PURPLE],
      ].map((node: (number | string)[], i: number) => {
        const [cx, cy, c] = node as [number, number, string]
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="20" fill="#0e0e1c" stroke={c} strokeWidth="1.6" />
            <circle cx={cx} cy={cy - 4} r="6" fill={c} />
            <path d={`M ${Number(cx) - 9} ${Number(cy) + 12} q 9 -12 18 0`} fill={c} fillOpacity="0.5" />
          </g>
        )
      })}
      <text x="200" y="196" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#fff" opacity="0.4">build in the open · ship together</text>
    </Shell>
  )
}

/* ── LumiForge: image generation sparkles ── */
function LumiForgeVisual() {
  const id = 'lf'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <rect x="110" y="52" width="180" height="130" rx="10" fill="#0e0e1c" stroke={`url(#${id}-accent)`} strokeWidth="1.5" />
      <g opacity="0.9">
        <circle cx="158" cy="108" r="26" fill={PURPLE} fillOpacity="0.2" />
        <circle cx="216" cy="96" r="18" fill={CYAN} fillOpacity="0.15" />
        <circle cx="196" cy="138" r="22" fill={BLUE} fillOpacity="0.15" />
        <path d="M 158 108 l 6 10 l 10 2 l -8 8 l 2 11 l -10 -6 l -10 6 l 2 -11 l -8 -8 l 10 -2 Z" fill={CYAN} fillOpacity="0.5" />
      </g>
      <path d="M 68 60 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 Z" fill={PURPLE} fillOpacity="0.8" />
      <path d="M 324 96 l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z" fill={CYAN} fillOpacity="0.8" />
      <path d="M 330 160 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z" fill={PURPLE} fillOpacity="0.7" />
      <path d="M 62 168 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z" fill={BLUE} fillOpacity="0.7" />
      <text x="200" y="202" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#fff" opacity="0.4">pay-as-you-go credits</text>
    </Shell>
  )
}

/* ── Epsilon: draggable blocks on canvas ── */
function EpsilonVisual() {
  const id = 'ep'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g>
        <rect x="60" y="46" width="120" height="66" rx="8" fill="#0e0e1c" stroke={BLUE} strokeOpacity="0.6" strokeWidth="1.3" />
        <line x1="76" y1="62" x2="164" y2="62" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
        <line x1="76" y1="76" x2="140" y2="76" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="rotate(4 240 120)">
        <rect x="170" y="90" width="120" height="66" rx="8" fill="#0e0e1c" stroke={PURPLE} strokeOpacity="0.6" strokeWidth="1.3" />
        <circle cx="192" cy="112" r="7" fill={CYAN} fillOpacity="0.5" />
        <rect x="210" y="105" width="40" height="14" rx="4" fill={PURPLE} fillOpacity="0.5" />
        <rect x="210" y="127" width="56" height="8" rx="4" fill="#ffffff" fillOpacity="0.12" />
      </g>
      <g transform="rotate(-4 130 168)">
        <rect x="100" y="140" width="80" height="46" rx="8" fill="#0e0e1c" stroke={CYAN} strokeOpacity="0.5" strokeWidth="1.2" />
        <text x="120" y="168" fontFamily="monospace" fontSize="10" fill={CYAN} opacity="0.9">{'```code```'}</text>
      </g>
      <text x="200" y="202" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#fff" opacity="0.35">notes · canvas · boards</text>
    </Shell>
  )
}

/* ── Universe Simulator: particle field ── */
function UniverseVisual() {
  const id = 'us'
  const dots: React.ReactNode[] = []
  const colors = [CYAN, PURPLE, BLUE, '#ffffff']
  for (let i = 0; i < 90; i++) {
    const x = (i * 137.5) % 400
    const y = (i * 61.8) % 220
    const r = 0.6 + ((i * 7) % 10) / 10
    const c = colors[i % 4]
    dots.push(<circle key={i} cx={x} cy={y} r={r} fill={c} opacity={0.5 + ((i * 13) % 50) / 100} />)
  }
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <g>
        <ellipse cx="200" cy="110" rx="130" ry="70" fill="none" stroke={PURPLE} strokeOpacity="0.35" strokeWidth="1" transform="rotate(-18 200 110)" />
        <ellipse cx="200" cy="110" rx="170" ry="92" fill="none" stroke={CYAN} strokeOpacity="0.25" strokeWidth="1" transform="rotate(-18 200 110)" />
        {dots}
        <circle cx="200" cy="110" r="5" fill="#fff" />
        <circle cx="200" cy="110" r="10" fill="none" stroke={CYAN} strokeOpacity="0.6" strokeWidth="1" />
      </g>
      <g fontFamily="monospace" fontSize="8" fill="#ffffff" opacity="0.4">
        <text x="18" y="204">80,000 particles</text>
        <circle cx="320" cy="200" r="3" fill={CYAN} />
        <text x="328" y="203">60fps</text>
      </g>
    </Shell>
  )
}

const visuals: Record<string, Visual> = {
  careernorth: CareerNorthVisual,
  repolens: RepoLensVisual,
  shelf: ShelfVisual,
  astra: AstraVisual,
  'rgd-school': SchoolVisual,
  kakshaone: SchoolVisual,
  nexpay: NexPayVisual,
  flowforge: FlowForgeVisual,
  taskmesh: TaskMeshVisual,
  throttlegate: ThrottleGateVisual,
  aptiq: AptiqVisual,
  glyphcast: GlyphcastVisual,
  'techies-community': CommunityVisual,
  'lumiforge-ai': LumiForgeVisual,
  epsilon: EpsilonVisual,
  'universe-simulator': UniverseVisual,
}

function FallbackVisual() {
  const id = 'fb'
  return (
    <Shell id={id}>
      <GridDefs id={id} />
      <rect x="140" y="70" width="120" height="80" rx="10" fill="#0e0e1c" stroke={`url(#${id}-accent)`} strokeWidth="1.5" />
      <circle cx="200" cy="110" r="14" fill="none" stroke={CYAN} strokeWidth="2" />
      <circle cx="200" cy="110" r="5" fill={PURPLE} />
    </Shell>
  )
}

export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const Visual = visuals[project.slug] ?? FallbackVisual
  return (
    <div className={className}>
      <Visual />
    </div>
  )
}

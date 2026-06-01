'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { PathfindingViz } from '@/components/engineering/PathfindingViz'
import { SortingViz } from '@/components/engineering/SortingViz'
import { PhysicsSandbox } from '@/components/engineering/PhysicsSandbox'

const ShaderPlayground = dynamic(() => import('@/components/engineering/ShaderPlayground').then(mod => ({ default: mod.ShaderPlayground })), { ssr: false })

const tabs = [
  { id: 'pathfinding', label: 'Pathfinding' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'physics', label: 'Physics' },
  { id: 'shaders', label: 'Shaders' },
]

export function EngineeringLabClient() {
  const [activeTab, setActiveTab] = useState('pathfinding')

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <header className="mb-8 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-10 sm:pb-12 sm:pt-14 lg:pb-14 lg:pt-20">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> Engineering Lab
            </div>
            <h1 className="text-[clamp(36px,11vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Interactive<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px var(--stroke)" }}>Playground</span>
            </h1>
            <p className="mt-5 max-w-[580px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.75]">
              Algorithm visualizations, physics simulations, and GPU shader experiments — all running in real-time.
            </p>
          </div>
        </header>

        <div className="mb-8 flex flex-wrap gap-1 rounded-xl border p-1" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 rounded-lg px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all"
              style={{
                fontFamily: "'DM Mono', monospace",
                backgroundColor: activeTab === tab.id ? 'var(--accent-bg)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-text)' : 'var(--text-secondary)',
                border: activeTab === tab.id ? '0.5px solid var(--accent)' : '0.5px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}
        >
          {activeTab === 'pathfinding' && <PathfindingViz />}
          {activeTab === 'sorting' && <SortingViz />}
          {activeTab === 'physics' && <PhysicsSandbox />}
          {activeTab === 'shaders' && <ShaderPlayground />}
        </div>
      </div>
    </div>
  )
}

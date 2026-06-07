'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, ExternalLink, Github, Calendar, Shield, Server, GitBranch, AlertTriangle, Eye, Scale, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'

const ArchitectureExplorer = dynamic(() => import('@/components/3d/ArchitectureExplorer').then(mod => ({ default: mod.ArchitectureExplorer })), { ssr: false })

interface ProjectDetailClientProps {
  project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden pt-14 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-15">
        <ArchitectureExplorer />
      </div>
      <div className="relative z-10">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="tag inline-flex items-center gap-1.5 mb-8"
        >
          <ArrowLeft size={9} /> Back
        </Link>

        <div className="flex flex-col gap-6 mb-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-[640px]">
            <div className="font-dm-mono mb-3 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>{project.category || 'Project'}</div>
            <h1 className="font-syne text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.05]" style={{ color: 'var(--text-primary)' }}>{project.title}</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink size={11} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Github size={11} /> Source
              </a>
            )}
          </div>
        </div>

        <p className="mb-10 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

        <div className="mb-12 flex flex-wrap gap-2">
          {project.techStack?.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-4" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-[var(--bg-primary)] p-4 sm:p-5">
                <div className="font-syne text-xl font-bold tracking-[-0.02em] sm:text-2xl" style={{ color: 'var(--accent-text)' }}>{m.val}</div>
                <div className="font-dm-mono mt-1 text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-14">

          {project.domain && (
            <Section>
              <SectionTitle icon={Server} title="Domain Knowledge" subtitle="What problem this project solves" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.domain}</p>
              </div>
            </Section>
          )}

          {project.architecture && (
            <Section>
              <SectionTitle icon={GitBranch} title="Architecture" subtitle="How the system is structured" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.architecture}</p>
              </div>
            </Section>
          )}

          {project.dataModel && (
            <Section>
              <SectionTitle icon={Server} title="Data Model" subtitle="Schema design and data flow" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.dataModel}</p>
              </div>
            </Section>
          )}

          {project.challenges && (
            <Section>
              <SectionTitle icon={AlertTriangle} title="Key Challenges" subtitle="Hardest problems encountered" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.challenges}</p>
              </div>
            </Section>
          )}

          {project.scalingStrategy && (
            <Section>
              <SectionTitle icon={ArrowUpRight} title="Scaling Strategy" subtitle="How the system grows" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.scalingStrategy}</p>
              </div>
            </Section>
          )}

          {project.security && (
            <Section>
              <SectionTitle icon={Shield} title="Security" subtitle="Defense-in-depth approach" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-start gap-3">
                  <Shield size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-text)' }} />
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.security}</p>
                </div>
              </div>
            </Section>
          )}

          {project.failureHandling && (
            <Section>
              <SectionTitle icon={AlertTriangle} title="Failure Handling" subtitle="Resilience and recovery" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.failureHandling}</p>
              </div>
            </Section>
          )}

          {project.observability && (
            <Section>
              <SectionTitle icon={Eye} title="Observability" subtitle="Monitoring and debugging" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.observability}</p>
              </div>
            </Section>
          )}

          {project.tradeoffs && (
            <Section>
              <SectionTitle icon={Scale} title="Trade-offs" subtitle="Engineering decisions and alternatives" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.tradeoffs}</p>
              </div>
            </Section>
          )}

          {project.architectureDecisions && project.architectureDecisions.length > 0 && (
            <Section>
              <SectionTitle icon={GitBranch} title="Architecture Decisions" subtitle="Key choices and what was rejected" />
              <div className="grid gap-px overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
                <div className="grid grid-cols-3 gap-px bg-[var(--card-border)]">
                  <div className="bg-[var(--bg-primary)] p-3 sm:p-4">
                    <span className="font-dm-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--accent-text)' }}>Decision</span>
                  </div>
                  <div className="bg-[var(--bg-primary)] p-3 sm:p-4">
                    <span className="font-dm-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--accent-text)' }}>Chosen</span>
                  </div>
                  <div className="bg-[var(--bg-primary)] p-3 sm:p-4">
                    <span className="font-dm-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Rejected</span>
                  </div>
                </div>
                {project.architectureDecisions.map((d, i) => (
                  <div key={i} className="grid grid-cols-3 gap-px">
                    <div className="bg-[var(--bg-primary)] p-3 sm:p-4">
                      <span className="text-xs font-medium">{d.decision}</span>
                    </div>
                    <div className="bg-[var(--bg-primary)] p-3 sm:p-4">
                      <span className="text-xs" style={{ color: 'var(--accent-text)' }}>{d.chosen}</span>
                    </div>
                    <div className="bg-[var(--bg-primary)] p-3 sm:p-4">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{d.rejected}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {project.seniorTopics && project.seniorTopics.length > 0 && (
            <Section>
              <SectionTitle icon={Server} title="Senior-Level Topics" subtitle="Concepts this project explores" />
              <div className="flex flex-wrap gap-2">
                {project.seniorTopics.map((topic) => (
                  <span key={topic} className="tag-accent">{topic}</span>
                ))}
              </div>
            </Section>
          )}

          {project.lessonsLearned && (
            <Section>
              <SectionTitle icon={AlertTriangle} title="Lessons Learned" subtitle="What would be done differently" />
              <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.lessonsLearned}</p>
              </div>
            </Section>
          )}

          {project.timeline && project.timeline.length > 0 && (
            <Section>
              <SectionTitle icon={Calendar} title="Timeline" subtitle="Project milestones" />
              <div className="rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                <div className="bg-[var(--bg-primary)] p-5 sm:p-7">
                  {project.timeline.map((event, i) => (
                    <div key={i} className={`flex gap-4 ${i < project.timeline!.length - 1 ? 'pb-7' : ''}`}>
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 0 4px var(--accent-bg)' }} />
                        {i < project.timeline!.length - 1 && (
                          <div className="w-px flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
                        )}
                      </div>
                      <div className="pt-0.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Calendar size={11} className="shrink-0" style={{ color: 'var(--text-muted)' }} />
                          <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{event.date}</span>
                        </div>
                        <h4 className="font-syne text-base font-bold tracking-[-0.02em]">{event.title}</h4>
                        <p className="mt-1 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          )}

        </div>
      </div>
    </div>
    </div>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <Icon size={14} style={{ color: 'var(--accent-text)' }} />
      </div>
      <div>
        <h2 className="font-syne text-lg font-bold tracking-[-0.02em]">{title}</h2>
        <p className="font-dm-mono mt-0.5 text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      </div>
    </div>
  )
}

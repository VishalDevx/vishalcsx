'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, ExternalLink, Github, Calendar, BarChart3, Shield, Clock, Activity, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'

const ArchitectureExplorer = dynamic(() => import('@/components/3d/ArchitectureExplorer').then(mod => ({ default: mod.ArchitectureExplorer })), { ssr: false })

interface ProjectDetailClientProps {
  project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-15">
        <ArchitectureExplorer />
      </div>
      <div className="relative z-10">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="tag inline-flex items-center gap-1.5 mb-8"
        >
          <ArrowLeft size={9} /> Back
        </Link>

        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="font-dm-mono mb-3 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>{project.category || 'Project'}</div>
            <h1 className="font-syne text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>{project.title}</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={11} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github size={11} /> Source
              </a>
            )}
          </div>
        </div>

        <p className="mb-6 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

        <div className="mb-12 flex flex-wrap gap-2">
          {project.techStack?.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        {project.imageUrl && (
          <div className="mb-12 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
            <img src={project.imageUrl} alt={project.title} className="w-full object-cover" />
          </div>
        )}

        <div className="space-y-12">
          {project.fullDescription && (
            <Section>
              <SectionTitle>Overview</SectionTitle>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.fullDescription}</p>
            </Section>
          )}

          {project.architecture && (
            <Section>
              <SectionTitle>Architecture</SectionTitle>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                <div className="bg-[var(--bg-primary)] p-5 text-sm font-light leading-relaxed sm:p-6" style={{ color: 'var(--text-secondary)' }}>
                  {project.architecture}
                </div>
              </div>
            </Section>
          )}

          {project.challenges && (
            <Section>
              <SectionTitle>Challenges</SectionTitle>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                <div className="bg-[var(--bg-primary)] p-5 text-sm font-light leading-relaxed sm:p-6" style={{ color: 'var(--text-secondary)' }}>
                  {project.challenges}
                </div>
              </div>
            </Section>
          )}

          {project.scalingStrategy && (
            <Section>
              <SectionTitle>Scaling Strategy</SectionTitle>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                <div className="bg-[var(--bg-primary)] p-5 text-sm font-light leading-relaxed sm:p-6" style={{ color: 'var(--text-secondary)' }}>
                  {project.scalingStrategy}
                </div>
              </div>
            </Section>
          )}

          {project.security && (
            <Section>
              <SectionTitle>Security Implementation</SectionTitle>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                <div className="bg-[var(--bg-primary)] flex items-start gap-3 p-5 text-sm font-light leading-relaxed sm:p-6" style={{ color: 'var(--text-secondary)' }}>
                  <Shield size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-text)' }} />
                  <span>{project.security}</span>
                </div>
              </div>
            </Section>
          )}

          {project.performanceMetrics && (
            <Section>
              <SectionTitle>Performance Metrics</SectionTitle>
              <div className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
                {project.performanceMetrics.responseTime && (
                  <MetricCard icon={Clock} label="Response Time" value={project.performanceMetrics.responseTime} />
                )}
                {project.performanceMetrics.throughput && (
                  <MetricCard icon={BarChart3} label="Throughput" value={project.performanceMetrics.throughput} />
                )}
                {project.performanceMetrics.uptime && (
                  <MetricCard icon={Activity} label="Uptime" value={project.performanceMetrics.uptime} />
                )}
              </div>
            </Section>
          )}

          {project.lessonsLearned && (
            <Section>
              <SectionTitle>Lessons Learned</SectionTitle>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                <div className="bg-[var(--bg-primary)] p-5 text-sm font-light leading-relaxed sm:p-6" style={{ color: 'var(--text-secondary)' }}>
                  {project.lessonsLearned}
                </div>
              </div>
            </Section>
          )}

          {project.timeline && project.timeline.length > 0 && (
            <Section>
              <SectionTitle>Timeline</SectionTitle>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                  {project.timeline.map((event, i) => (
                    <div key={i} className={`flex gap-4 ${i < project.timeline!.length - 1 ? 'pb-6' : ''}`}>
                      <div className="flex flex-col items-center">
                        <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 0 4px var(--accent-bg)' }} />
                        {i < project.timeline!.length - 1 && (
                          <div className="w-px flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={11} className="shrink-0" style={{ color: 'var(--text-muted)' }} />
                          <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{event.date}</span>
                        </div>
                        <h4 className="font-syne text-sm font-bold tracking-[-0.02em]">{event.title}</h4>
                        <p className="mt-0.5 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-header mb-4">
      <span className="section-header-text">{children}</span>
      <div className="section-header-line" />
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>
  label: string
  value: string
}) {
  return (
    <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
      <Icon size={16} style={{ color: 'var(--accent-text)' }} />
      <div className="mt-2 font-syne text-[26px] font-bold tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>{value}</div>
      <div className="font-dm-mono mt-1 text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectCard3DProps {
  project: Project
  index?: number
}

export function ProjectCard3D({ project, index = 0 }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      className="group"
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 16,
            border: '1px solid var(--border-subtle)',
            background: 'var(--card-bg)',
            transition: 'all 0.3s',
            transformStyle: 'preserve-3d',
          }}
          className="hover:shadow-2xl"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)'
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '12rem',
              overflow: 'hidden',
              background: 'var(--bg-tertiary)',
              transform: 'translateZ(20px)',
            }}
            className="sm:h-56"
          >
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
                    {project.title.charAt(0)}
                  </div>
                  <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    {project.category}
                  </div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent" />
          </div>

          <div className="p-5 sm:p-6" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
              <div className="flex items-center gap-1.5 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      height: 32, width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 6, color: 'var(--text-muted)',
                    }}
                    className="hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      height: 32, width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 6, color: 'var(--text-muted)',
                    }}
                    className="hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack?.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: '2px 8px', fontSize: 12, fontFamily: 'var(--font-mono)',
                    borderRadius: 6, background: 'var(--accent-bg)',
                    color: 'var(--accent-text)', border: '1px solid var(--accent)',
                  }}
                >
                  {tech}
                </span>
              ))}
              {(project.techStack?.length || 0) > 5 && (
                <span style={{
                  padding: '2px 8px', fontSize: 12, fontFamily: 'var(--font-mono)',
                  borderRadius: 6, background: 'var(--bg-tertiary)',
                  color: 'var(--text-muted)',
                }}>
                  +{project.techStack!.length - 5}
                </span>
              )}
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              borderRadius: 16,
              background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.06), transparent 40%)',
              transform: 'translateZ(10px)',
            }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

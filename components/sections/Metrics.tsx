'use client'

import { MetricCounter } from '@/components/ui/MetricCounter'
import type { MetricItem } from '@/types'

const defaultMetrics: MetricItem[] = [
  { label: 'Projects Built', value: 12, source: 'static' },
  { label: 'OSS Contributions', value: 45, source: 'github' },
  { label: 'Technologies Used', value: 25, source: 'static' },
  { label: 'Systems Designed', value: 8, source: 'static' },
  { label: 'Years Experience', value: 3, suffix: '+', source: 'static' },
]

export function Metrics() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border-subtle bg-bg-secondary/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-border-subtle">
            {defaultMetrics.map((metric) => (
              <MetricCounter
                key={metric.label}
                value={metric.value}
                suffix={metric.suffix || ''}
                label={metric.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

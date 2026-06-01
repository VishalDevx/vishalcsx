import { SystemDesignPageClient } from './client'

export const metadata = {
  title: 'System Design',
  description: 'Interactive system design visualizations — architecture patterns, data flow, and deployment strategies.',
  openGraph: {
    title: 'System Design — Vishal Singh',
    description: 'Interactive system design visualizations — architecture patterns, data flow, and deployment strategies.',
  },
}

export default function SystemDesignPage() {
  return <SystemDesignPageClient />
}

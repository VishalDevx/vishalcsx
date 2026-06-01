import { EngineeringLabClient } from './client'

export const metadata = {
  title: 'Engineering Lab',
  description: 'Interactive playground — pathfinding algorithms, sorting visualizations, physics simulations, and GPU shader experiments.',
  openGraph: {
    title: 'Engineering Lab — Vishal Singh',
    description: 'Interactive playground — pathfinding algorithms, sorting visualizations, physics simulations, and GPU shader experiments.',
  },
}

export default function EngineeringLabPage() {
  return <EngineeringLabClient />
}

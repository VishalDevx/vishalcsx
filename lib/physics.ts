import type { Vec3 } from './math'
import { add, scale, subtract, magnitude, normalize, clamp, randomRange } from './math'

export interface Particle {
  position: Vec3
  velocity: Vec3
  acceleration: Vec3
  mass: number
  life: number
  maxLife: number
}

export function createParticle(position: Vec3, velocity: Vec3, mass = 1, maxLife = 1): Particle {
  return { position, velocity, acceleration: { x: 0, y: 0, z: 0 }, mass, life: maxLife, maxLife }
}

export function updateParticle(p: Particle, dt: number, damping = 0.99): void {
  p.velocity = add(p.velocity, scale(p.acceleration, dt))
  p.velocity = scale(p.velocity, damping)
  p.position = add(p.position, scale(p.velocity, dt))
  p.acceleration = { x: 0, y: 0, z: 0 }
  p.life -= dt
}

export function applyForce(p: Particle, force: Vec3): void {
  p.acceleration = add(p.acceleration, scale(force, 1 / p.mass))
}

export function applyGravity(p: Particle, g: Vec3 = { x: 0, y: -9.81, z: 0 }): void {
  applyForce(p, scale(g, p.mass))
}

export interface Spring {
  a: { position: Vec3; velocity?: Vec3 }
  b: { position: Vec3; velocity?: Vec3 }
  restLength: number
  stiffness: number
  damping: number
}

export function updateSpring(s: Spring, dt: number): void {
  const dir = subtract(s.b.position, s.a.position)
  const dist = magnitude(dir)
  if (dist === 0) return
  const force = (dist - s.restLength) * s.stiffness
  const dirNorm = normalize(dir)
  const relVel = s.a.velocity
    ? subtract(
        s.b.velocity || { x: 0, y: 0, z: 0 },
        s.a.velocity,
      )
    : { x: 0, y: 0, z: 0 }
  const dampForce = dot(relVel, dirNorm) * s.damping

  const fMag = force + dampForce
  const fVec = scale(dirNorm, fMag)

  if (s.a.velocity) {
    s.a.velocity = add(s.a.velocity, scale(fVec, dt))
  }
  if (s.b.velocity) {
    s.b.velocity = subtract(s.b.velocity, scale(fVec, dt))
  }
}

export function computeHookesLaw(displacement: number, stiffness: number): number {
  return -stiffness * displacement
}

export interface ForceSimNode {
  id: string
  position: Vec3
  velocity: Vec3
  fixed?: boolean
}

export interface ForceSimEdge {
  source: string
  target: string
  strength?: number
}

export function simulateForceDirected(
  nodes: ForceSimNode[],
  edges: ForceSimEdge[],
  dt: number,
  repulsion = 100,
  attraction = 0.01,
  damping = 0.9,
): void {
  for (const node of nodes) {
    if (node.fixed) continue
    node.velocity = scale(node.velocity, damping)
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dir = subtract(nodes[i].position, nodes[j].position)
      const dist = Math.max(magnitude(dir), 0.1)
      const force = repulsion / (dist * dist)
      const fVec = scale(normalize(dir), force)
      if (!nodes[i].fixed) nodes[i].velocity = add(nodes[i].velocity, scale(fVec, dt))
      if (!nodes[j].fixed) nodes[j].velocity = subtract(nodes[j].velocity, scale(fVec, dt))
    }
  }

  for (const edge of edges) {
    const src = nodes.find((n) => n.id === edge.source)
    const tgt = nodes.find((n) => n.id === edge.target)
    if (!src || !tgt) continue
    const dir = subtract(tgt.position, src.position)
    const dist = magnitude(dir)
    const force = (dist - 1) * attraction * (edge.strength || 1)
    const fVec = scale(normalize(dir), force)
    if (!src.fixed) src.velocity = add(src.velocity, scale(fVec, dt))
    if (!tgt.fixed) tgt.velocity = subtract(tgt.velocity, scale(fVec, dt))
  }

  for (const node of nodes) {
    if (node.fixed) continue
    node.position = add(node.position, scale(node.velocity, dt))
  }
}

export interface Boid {
  position: Vec3
  velocity: Vec3
}

export function updateBoids(
  boids: Boid[],
  dt: number,
  alignment = 0.05,
  cohesion = 0.01,
  separation = 0.1,
  maxSpeed = 2,
  perception = 5,
): void {
  for (const boid of boids) {
    let align: Vec3 = { x: 0, y: 0, z: 0 }
    let cohe: Vec3 = { x: 0, y: 0, z: 0 }
    let sepa: Vec3 = { x: 0, y: 0, z: 0 }
    let neighbors = 0

    for (const other of boids) {
      if (other === boid) continue
      const dist = magnitude(subtract(boid.position, other.position))
      if (dist < perception) {
        align = add(align, other.velocity)
        cohe = add(cohe, other.position)
        const diff = normalize(subtract(boid.position, other.position))
        sepa = add(sepa, scale(diff, 1 / Math.max(dist, 0.01)))
        neighbors++
      }
    }

    if (neighbors > 0) {
      align = scale(align, 1 / neighbors)
      align = scale(normalize(align), maxSpeed)
      align = scale(subtract(align, boid.velocity), alignment)

      cohe = scale(cohe, 1 / neighbors)
      cohe = normalize(subtract(cohe, boid.position))
      cohe = scale(cohe, maxSpeed)
      cohe = scale(subtract(cohe, boid.velocity), cohesion)

      sepa = scale(sepa, 1 / neighbors)
      sepa = scale(normalize(sepa), maxSpeed)
      sepa = scale(subtract(sepa, boid.velocity), separation)
    }

    const acceleration = add(add(align, cohe), sepa)
    boid.velocity = add(boid.velocity, scale(acceleration, dt))

    const speed = magnitude(boid.velocity)
    if (speed > maxSpeed) {
      boid.velocity = scale(normalize(boid.velocity), maxSpeed)
    }

    boid.position = add(boid.position, scale(boid.velocity, dt))
  }
}

export function curlNoise(x: number, y: number, z: number, t: number): Vec3 {
  const e = 0.1
  const n = (x: number, y: number, z: number) => {
    const s = x * 0.1 + t * 0.2
    const c = y * 0.1 + t * 0.15
    const d = z * 0.1 + t * 0.1
    return Math.sin(s) * Math.cos(c) * Math.sin(d) +
           Math.sin(c) * Math.cos(d) * Math.sin(s) +
           Math.sin(d) * Math.cos(s) * Math.sin(c)
  }
  return {
    x: n(x, y + e, z) - n(x, y - e, z),
    y: n(x, y, z + e) - n(x, y, z - e),
    z: n(x + e, y, z) - n(x - e, y, z),
  }
}

export function eulerToQuaternion(yaw: number, pitch: number, roll: number): { x: number; y: number; z: number; w: number } {
  const cy = Math.cos(yaw * 0.5)
  const sy = Math.sin(yaw * 0.5)
  const cp = Math.cos(pitch * 0.5)
  const sp = Math.sin(pitch * 0.5)
  const cr = Math.cos(roll * 0.5)
  const sr = Math.sin(roll * 0.5)
  return {
    x: sr * cp * cy - cr * sp * sy,
    y: cr * sp * cy + sr * cp * sy,
    z: cr * cp * sy - sr * sp * cy,
    w: cr * cp * cy + sr * sp * sy,
  }
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

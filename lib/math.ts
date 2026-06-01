export type Vec2 = { x: number; y: number }
export type Vec3 = { x: number; y: number; z: number }

export function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

export function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

export function magnitude(v: Vec3): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
}

export function normalize(v: Vec3): Vec3 {
  const m = magnitude(v)
  if (m === 0) return { x: 0, y: 0, z: 0 }
  return { x: v.x / m, y: v.y / m, z: v.z / m }
}

export function subtract(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
}

export function add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

export function scale(v: Vec3, s: number): Vec3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s }
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function quadraticBezier(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3 {
  const mt = 1 - t
  return add(add(scale(p0, mt * mt), scale(p1, 2 * mt * t)), scale(p2, t * t))
}

export function cubicBezier(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 {
  const mt = 1 - t
  const mt2 = mt * mt
  const t2 = t * t
  return add(
    add(add(scale(p0, mt2 * mt), scale(p1, 3 * mt2 * t)), scale(p2, 3 * mt * t2)),
    scale(p3, t2 * t),
  )
}

export function sphericalToCartesian(lat: number, lng: number, radius: number): Vec3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  }
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

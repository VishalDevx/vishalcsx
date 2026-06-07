'use client'

export function ScrollGradient() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: 'linear-gradient(180deg, rgba(0,245,255,0.03) 0%, rgba(123,47,255,0.04) 25%, rgba(236,72,153,0.03) 50%, rgba(123,47,255,0.04) 75%, rgba(0,245,255,0.03) 100%)',
      }}
    />
  )
}

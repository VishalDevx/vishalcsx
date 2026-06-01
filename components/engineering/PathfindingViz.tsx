'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

type Cell = { row: number; col: number }
type GridCell = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path'

const ROWS = 20
const COLS = 30
const algorithms = ['A*', 'Dijkstra', 'BFS', 'DFS'] as const

function heuristic(a: Cell, b: Cell) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

function getNeighbors(cell: Cell, grid: GridCell[][]): Cell[] {
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const result: Cell[] = []
  for (const [dr, dc] of dirs) {
    const nr = cell.row + dr
    const nc = cell.col + dc
    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] !== 'wall') {
      result.push({ row: nr, col: nc })
    }
  }
  return result
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

export function PathfindingViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [grid, setGrid] = useState<GridCell[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill('empty'))
  )
  const [start] = useState<Cell>({ row: 1, col: 1 })
  const [end] = useState<Cell>({ row: ROWS - 2, col: COLS - 2 })
  const [algo, setAlgo] = useState<typeof algorithms[number]>('A*')
  const [running, setRunning] = useState(false)
  const gridRef = useRef(grid)
  const runningRef = useRef(false)
  const speedRef = useRef(20)

  gridRef.current = grid

  useEffect(() => {
    const g = Array.from({ length: ROWS }, () => Array(COLS).fill('empty'))
    g[start.row][start.col] = 'start'
    g[end.row][end.col] = 'end'
    for (let i = 0; i < ROWS * COLS * 0.25; i++) {
      const r = Math.floor(Math.random() * ROWS)
      const c = Math.floor(Math.random() * COLS)
      if ((r === start.row && c === start.col) || (r === end.row && c === end.col)) continue
      g[r][c] = 'wall'
    }
    setGrid(g)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const cellW = canvas.width / COLS
    const cellH = canvas.height / ROWS

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const val = gridRef.current[r][c]
        const x = c * cellW
        const y = r * cellH
        if (val === 'wall') { ctx.fillStyle = '#1a1a1a' }
        else if (val === 'start') { ctx.fillStyle = '#22c55e' }
        else if (val === 'end') { ctx.fillStyle = '#ef4444' }
        else if (val === 'path') { ctx.fillStyle = '#3b82f6' }
        else if (val === 'visited') { ctx.fillStyle = '#1e293b' }
        else { ctx.fillStyle = 'transparent' }
        ctx.fillRect(x, y, cellW, cellH)
        ctx.strokeStyle = '#1a1a1a'
        ctx.lineWidth = 0.5
        ctx.strokeRect(x, y, cellW, cellH)
      }
    }
  }, [grid])

  const runAlgorithm = useCallback(async () => {
    if (runningRef.current) return
    setRunning(true)
    runningRef.current = true
    const g = gridRef.current.map(row => [...row])
    const startCell = start
    const endCell = end

    const openSet: { cell: Cell; f: number; g: number; parent: Cell | null }[] = []
    const startG = algo === 'BFS' || algo === 'DFS' ? 0 : 0
    openSet.push({ cell: startCell, f: heuristic(startCell, endCell), g: startG, parent: null })

    const visited = new Set<string>()
    const parentMap = new Map<string, Cell | null>()
    parentMap.set(`${startCell.row},${startCell.col}`, null)

    while (openSet.length > 0 && runningRef.current) {
      let current: { cell: Cell; g: number; parent: Cell | null }

      if (algo === 'DFS') {
        current = openSet.pop()!
      } else if (algo === 'BFS') {
        current = openSet.shift()!
      } else {
        openSet.sort((a, b) => a.f - b.f)
        current = openSet.shift()!
      }

      const key = `${current.cell.row},${current.cell.col}`
      if (current.cell.row === endCell.row && current.cell.col === endCell.col) {
        let cur: Cell | null = current.cell
        while (cur) {
          const pk: string = `${cur.row},${cur.col}`
          if (g[cur.row][cur.col] !== 'start' && g[cur.row][cur.col] !== 'end') {
            g[cur.row][cur.col] = 'path'
          }
          cur = parentMap.get(pk) ?? null
        }
        setGrid(g)
        setRunning(false)
        runningRef.current = false
        return
      }

      if (visited.has(key)) continue
      visited.add(key)

      if (g[current.cell.row][current.cell.col] !== 'start' && g[current.cell.row][current.cell.col] !== 'end') {
        g[current.cell.row][current.cell.col] = 'visited'
      }
      setGrid([...g.map(row => [...row])])

      const neighbors = getNeighbors(current.cell, g as GridCell[][])
      for (const n of neighbors) {
        const nk = `${n.row},${n.col}`
        if (visited.has(nk)) continue
        if (!parentMap.has(nk)) {
          parentMap.set(nk, current.cell)
          const newG = current.g + 1
          const f = algo === 'A*' ? newG + heuristic(n, endCell) : newG
          openSet.push({ cell: n, f, g: newG, parent: current.cell })
        }
      }

      await sleep(speedRef.current)
    }

    setRunning(false)
    runningRef.current = false
  }, [algo, start, end])

  const clearPath = () => {
    const g = gridRef.current.map(row => [...row])
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (g[r][c] === 'visited' || g[r][c] === 'path') g[r][c] = 'empty'
      }
    }
    setGrid(g)
  }

  const generateWalls = () => {
    const g = Array.from({ length: ROWS }, () => Array(COLS).fill('empty'))
    g[start.row][start.col] = 'start'
    g[end.row][end.col] = 'end'
    for (let i = 0; i < ROWS * COLS * 0.3; i++) {
      const r = Math.floor(Math.random() * ROWS)
      const c = Math.floor(Math.random() * COLS)
      if ((r === start.row && c === start.col) || (r === end.row && c === end.col)) continue
      g[r][c] = 'wall'
    }
    setGrid(g)
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg border p-1" style={{ borderColor: 'var(--border-color)' }}>
          {algorithms.map((a) => (
            <button
              key={a}
              disabled={running}
              onClick={() => setAlgo(a)}
              className="rounded-md px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-all disabled:opacity-50"
              style={{
                fontFamily: "'DM Mono', monospace",
                backgroundColor: algo === a ? 'var(--accent-bg)' : 'transparent',
                color: algo === a ? 'var(--accent-text)' : 'var(--text-secondary)',
              }}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <button onClick={generateWalls} disabled={running} className="tag">Generate Walls</button>
          <button onClick={runAlgorithm} disabled={running} className="btn-primary text-[10px]">Run</button>
          <button onClick={clearPath} disabled={running} className="tag">Clear Path</button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-dm-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>Speed</span>
        <input
          type="range"
          min={5}
          max={100}
          defaultValue={20}
          onChange={(e) => { speedRef.current = parseInt(e.target.value) }}
          className="w-24 h-1 accent-[var(--accent)]"
        />
      </div>
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        className="w-full rounded-lg border"
        style={{ borderColor: 'var(--border-color)', imageRendering: 'pixelated' }}
      />
    </div>
  )
}

'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const ARRAY_SIZE = 50
const algorithms = ['Bubble', 'Quick', 'Merge', 'Insertion'] as const

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

export function SortingViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [arr, setArr] = useState<number[]>([])
  const [algo, setAlgo] = useState<typeof algorithms[number]>('Bubble')
  const [running, setRunning] = useState(false)
  const runningRef = useRef(false)
  const speedRef = useRef(30)
  const arrRef = useRef(arr)
  arrRef.current = arr

  const generateArray = useCallback(() => {
    const a = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 280) + 20)
    setArr(a)
    arrRef.current = a
  }, [])

  useEffect(() => { generateArray() }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || arr.length === 0) return
    const ctx = canvas.getContext('2d')!
    const w = canvas.width / arr.length
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < arr.length; i++) {
      const h = (arr[i] / 300) * canvas.height
      ctx.fillStyle = '#3b82f6'
      ctx.fillRect(i * w, canvas.height - h, w - 1, h)
    }
  }, [arr])

  const runSort = useCallback(async () => {
    if (runningRef.current) return
    setRunning(true)
    runningRef.current = true
    const a = [...arrRef.current]

    if (algo === 'Bubble') {
      for (let i = 0; i < a.length - 1 && runningRef.current; i++) {
        for (let j = 0; j < a.length - i - 1 && runningRef.current; j++) {
          if (a[j] > a[j + 1]) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]]
            setArr([...a])
            await sleep(speedRef.current)
          }
        }
      }
    } else if (algo === 'Insertion') {
      for (let i = 1; i < a.length && runningRef.current; i++) {
        let j = i
        while (j > 0 && a[j - 1] > a[j] && runningRef.current) {
          [a[j], a[j - 1]] = [a[j - 1], a[j]]
          j--
          setArr([...a])
          await sleep(speedRef.current)
        }
      }
    } else if (algo === 'Quick') {
      async function quickSort(low: number, high: number) {
        if (low >= high || !runningRef.current) return
        const pivot = a[high]
        let i = low - 1
        for (let j = low; j < high && runningRef.current; j++) {
          if (a[j] < pivot) {
            i++
            [a[i], a[j]] = [a[j], a[i]]
            setArr([...a])
            await sleep(speedRef.current)
          }
        }
        [a[i + 1], a[high]] = [a[high], a[i + 1]]
        setArr([...a])
        await sleep(speedRef.current)
        const pi = i + 1
        await quickSort(low, pi - 1)
        await quickSort(pi + 1, high)
      }
      await quickSort(0, a.length - 1)
    } else if (algo === 'Merge') {
      async function mergeSort(l: number, r: number) {
        if (l >= r || !runningRef.current) return
        const m = Math.floor((l + r) / 2)
        await mergeSort(l, m)
        await mergeSort(m + 1, r)
        const left = a.slice(l, m + 1)
        const right = a.slice(m + 1, r + 1)
        let i = 0, j = 0, k = l
        while (i < left.length && j < right.length && runningRef.current) {
          if (left[i] <= right[j]) { a[k] = left[i]; i++ }
          else { a[k] = right[j]; j++ }
          k++
          setArr([...a])
          await sleep(speedRef.current)
        }
        while (i < left.length && runningRef.current) { a[k] = left[i]; i++; k++; setArr([...a]); await sleep(speedRef.current) }
        while (j < right.length && runningRef.current) { a[k] = right[j]; j++; k++; setArr([...a]); await sleep(speedRef.current) }
      }
      await mergeSort(0, a.length - 1)
    }

    setRunning(false)
    runningRef.current = false
  }, [algo])

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
          <button onClick={generateArray} disabled={running} className="tag">Generate</button>
          <button onClick={runSort} disabled={running} className="btn-primary text-[10px]">Sort</button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-dm-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>Speed</span>
        <input
          type="range"
          min={5}
          max={100}
          defaultValue={30}
          onChange={(e) => { speedRef.current = parseInt(e.target.value) }}
          className="w-24 h-1 accent-[var(--accent)]"
        />
      </div>
      <canvas
        ref={canvasRef}
        width={900}
        height={400}
        className="w-full rounded-lg border"
        style={{ borderColor: 'var(--border-color)' }}
      />
    </div>
  )
}

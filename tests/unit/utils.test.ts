import { describe, it, expect } from 'vitest'
import { slugify, formatNumber, calculateReadingTime, getTimeAgo } from '@/lib/utils'

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('  Multi---space  ')).toBe('multi-space')
    expect(slugify('Special @#$ Characters')).toBe('special--characters')
  })
})

describe('formatNumber', () => {
  it('formats numbers with suffixes', () => {
    expect(formatNumber(500)).toBe('500')
    expect(formatNumber(1500)).toBe('1.5K')
    expect(formatNumber(2500000)).toBe('2.5M')
  })
})

describe('calculateReadingTime', () => {
  it('calculates reading time in minutes', () => {
    const words = Array(400).fill('word').join(' ')
    expect(calculateReadingTime(words)).toBe(2)

    const empty = ''
    expect(calculateReadingTime(empty)).toBe(0)
  })
})

describe('getTimeAgo', () => {
  it('returns relative time', () => {
    const yearAgo = new Date(Date.now() - 365 * 86400000).toISOString()
    expect(getTimeAgo(yearAgo)).toContain('year')

    const hourAgo = new Date(Date.now() - 3600000).toISOString()
    expect(getTimeAgo(hourAgo)).toContain('hour')
  })
})

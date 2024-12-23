import { describe, expect, it } from 'vitest'

import { cn, removeDuplicatesByName } from '../utils'

describe('cn', () => {
  it('combines class names', () => {
    const result = cn('class-one', 'class-two')
    expect(result).toBe('class-one class-two')
  })

  it('removes falsy values from the class names', () => {
    const result = cn('class-one', false, null, undefined, 'class-two')
    expect(result).toBe('class-one class-two')
  })

  it('handles conditional class names', () => {
    const condition = true
    const result = cn(condition && 'class-conditional', 'class-two')
    expect(result).toBe('class-conditional class-two')
  })

  it('merges conflicting Tailwind classes using twMerge', () => {
    const result = cn('bg-red-500', 'bg-blue-500')
    expect(result).toBe('bg-blue-500') // `twMerge` should resolve the conflict
  })

  it('handles empty input gracefully', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles complex class combinations', () => {
    const result = cn(
      'p-4',
      null,
      'mt-2',
      false,
      'hover:bg-blue-500',
      'bg-red-500',
      'bg-green-500'
    )
    expect(result).toBe('p-4 mt-2 hover:bg-blue-500 bg-green-500') // merged and filtered out duplicates/falsy
  })
})

interface Item {
  label: string
  value?: number
}

describe('removeDuplicatesByName', () => {
  it('returns an empty array if the input is empty', () => {
    const input: Item[] = []
    const result = removeDuplicatesByName(input)
    expect(result).toEqual([])
  })

  it('returns the same array if there are no duplicates', () => {
    const input: Item[] = [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 },
    ]
    const result = removeDuplicatesByName(input)
    expect(result).toEqual(input)
  })

  it('removes duplicates by label', () => {
    const input: Item[] = [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
      { label: 'A', value: 30 },
      { label: 'C', value: 40 },
      { label: 'B', value: 50 },
    ]
    const result = removeDuplicatesByName(input)

    // We expect only the first occurrence of "A" and "B" to remain
    expect(result).toEqual([
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
      { label: 'C', value: 40 },
    ])
  })

  it('removes duplicates when multiple consecutive duplicates are present', () => {
    const input: Item[] = [
      { label: 'X', value: 1 },
      { label: 'X', value: 2 },
      { label: 'X', value: 3 },
    ]
    const result = removeDuplicatesByName(input)

    // Only keep the first X
    expect(result).toEqual([{ label: 'X', value: 1 }])
  })

  it('removes duplicates based strictly on label and ignores other fields', () => {
    const input: Item[] = [
      { label: 'Dog' },
      { label: 'Cat', value: 1 },
      { label: 'Cat', value: 2 },
      { label: 'Bird', value: 1 },
    ]
    const result = removeDuplicatesByName(input)

    // "Cat" appears twice with different `value`s, but we only keep the first occurrence
    expect(result).toEqual([
      { label: 'Dog' },
      { label: 'Cat', value: 1 },
      { label: 'Bird', value: 1 },
    ])
  })
})

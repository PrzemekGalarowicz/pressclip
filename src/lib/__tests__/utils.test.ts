import { describe, expect, it } from 'vitest'

import { cn } from '../utils'

describe('cn utility function', () => {
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

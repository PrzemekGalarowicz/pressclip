import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeDuplicatesByName<T extends { label: string }>(arr: T[]) {
  return arr.reduce((acc: T[], current: T) => {
    if (!acc.find((item: T) => item.label === current.label)) {
      acc.push(current)
    }
    return acc
  }, [])
}

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getCookie, setCookie } from '../cookies'

// Mock document.cookie behavior
let mockCookieStore: Record<string, string> = {}

beforeEach(() => {
  mockCookieStore = {}
  Object.defineProperty(document, 'cookie', {
    get: () => {
      return Object.entries(mockCookieStore)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')
    },
    set: (cookie: string) => {
      const [nameValue] = cookie.split(';')
      const [name, value] = nameValue.split('=')
      mockCookieStore[name.trim()] = value.trim()
    },
    configurable: true,
  })
})

describe('setCookie', () => {
  it('sets a cookie with the given name, value, and expiration', () => {
    setCookie('testCookie', 'testValue', 7)

    expect(document.cookie).toContain('testCookie=testValue')
  })

  it('calculates the correct expiration date', () => {
    const setTimeSpy = vi.spyOn(Date.prototype, 'setTime')

    const now = new Date()
    const expiresInDays = 7
    const expectedTime = now.getTime() + expiresInDays * 24 * 60 * 60 * 1000

    setCookie('testCookie', 'testValue', expiresInDays)

    expect(setTimeSpy).toHaveBeenCalledWith(expectedTime)
    setTimeSpy.mockRestore() // Clean up the spy after the test
  })
})

describe('getCookie', () => {
  it('returns the value of a cookie by its name', () => {
    document.cookie = 'testCookie=testValue'

    const value = getCookie('testCookie')

    expect(value).toBe('testValue')
  })

  it('returns undefined if the cookie does not exist', () => {
    const value = getCookie('nonExistentCookie')

    expect(value).toBeUndefined()
  })

  it('decodes the value of the cookie correctly', () => {
    const encodedValue = encodeURIComponent('value with spaces')
    document.cookie = `encodedCookie=${encodedValue}`

    const value = getCookie('encodedCookie')

    expect(value).toBe('value with spaces')
  })
})

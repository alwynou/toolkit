import { describe, expect, it } from 'vitest'
import { curry } from './index'

describe('curry', () => {
  it('curry add', () => {
    const add = curry((a: number, b: number, c: number) => a + b + c)
    expect(add(1)(2)(3)).toBe(6)
    expect(add(1, 2)(3)).toBe(6)
    expect(add(1, 2, 3)).toBe(6)
    expect(add(1, 2)).toBeTypeOf('function')
  })
})

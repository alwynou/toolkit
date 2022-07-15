import { describe, expect, it } from 'vitest'
import { call } from './index'

describe('call', () => {
  it('call maybe function.', async () => {
    expect(call(() => 1)).toBe(1)
    expect(call(1)).toBe(1)
    expect(call(1, 2, 3)).toBe(1)
    const obj = { a: 1 }
    expect(call(obj, function (this: any) { return this.a })).toBe(1)
    expect(call((a: number, b: number) => a + b, 1, 2)).toBe(3)
  })
})

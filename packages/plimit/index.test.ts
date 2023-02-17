import { describe, expect, it } from 'vitest'
import { plimit } from './index'

describe('plimit', () => {
  const delay = (args: any, num = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(args)
      }, num)
    })
  }

  const p = plimit(1)

  it('plimit 1s', async () => {
    const start = Date.now()
    const input = [
      p(() => delay(1, 1000)),
      p(() => delay(2, 1000)),
      p(() => delay(3, 2000)),
    ]
    const ret = await Promise.all(input)
    const end = Date.now()
    const diff = end - start
    expect(ret).toBeTypeOf('object')
    expect(ret[0]).toBe(1)
    expect(ret[1]).toBe(2)
    expect(ret[2]).toBe(3)
    expect(diff).toBeGreaterThanOrEqual(4000)
    expect(diff).toBeLessThanOrEqual(4050)
  })
})

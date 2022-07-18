import { describe, expect, it } from 'vitest'
import { asyncMap } from './index'

describe('asyncMap', () => {
  it('async map', async () => {
    expect(await asyncMap([1, 2, 3], n => Promise.resolve(n * 2))).toEqual([2, 4, 6])
  })
})

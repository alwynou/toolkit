import { expect, describe, it } from 'vitest'
import { map } from './index'

describe('isPromise', () => {
  it('should be truthy', async () => {
    expect(await map([1, 2, 3], (n) => Promise.resolve(n * 2))).toEqual([2, 4, 6])
  })
})

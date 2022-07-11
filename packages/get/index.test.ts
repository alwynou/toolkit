import { expect, describe, it } from 'vitest'
import { get } from './index'

describe('get', () => {
  it('get object value by path', async () => {
    const obj = {
      a: {
        b: {
          c: ['d']
        }
      }
    }
    expect(get(obj, 'a.b.c.0')).toBe('d')
  })
})

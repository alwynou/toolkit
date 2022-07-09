import { expect, describe, it } from 'vitest'
import { pick } from '.'

describe('pick', () => {
  it('use a string arg to pick one property', () => {
    const obj = { a: 1, b: 2 }
    const ret = pick(obj, 'a')
    expect(ret).toEqual({ a: 1 })
  })

  it('use array args to pick multiple property', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const ret = pick(obj, ['a', 'b'])
    expect(ret).toEqual({ a: 1, b: 2 })
  })
})

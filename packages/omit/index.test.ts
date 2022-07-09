import { expect, describe, it } from 'vitest'
import { omit } from '.'

describe('omit', () => {
  it('use a string arg to omit one property', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj, 'a')).toEqual({ b: 2, c: 3 })
  })

  it('use array arg to omit multiple property', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj, ['a', 'b'])).toEqual({ c: 3 })
  })
})

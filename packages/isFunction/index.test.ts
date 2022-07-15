import { describe, expect, it } from 'vitest'
import { isFunction } from './index'

describe('isFunction', () => {
  it('should be falsy', () => {
    expect(isFunction({})).toBeFalsy()
  })

  it('should be truthy', () => {
    expect(isFunction(Function)).toBeTruthy()
    expect(isFunction(() => {})).toBeTruthy()
  })
})

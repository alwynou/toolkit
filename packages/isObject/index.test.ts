import { describe, expect, it } from 'vitest'
import { isObject } from './index'

describe('isObject', () => {
  it('should be falsy', () => {
    expect(isObject(null)).toBeFalsy()
  })

  it('should be truthy', () => {
    expect(isObject([])).toBeTruthy()
    expect(isObject({})).toBeTruthy()
    expect(isObject(new Date())).toBeTruthy()
  })
})

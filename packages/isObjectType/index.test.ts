import { expect, it, describe } from 'vitest'
import { isObjectType } from './index'

describe('isObjectType', () => {
  it('should be falsy', () => {
    expect(isObjectType(null)).toBeFalsy()
  })

  it('should be truthy', () => {
    expect(isObjectType([])).toBeTruthy()
    expect(isObjectType({})).toBeTruthy()
    expect(isObjectType(new Date())).toBeTruthy()
  })
})

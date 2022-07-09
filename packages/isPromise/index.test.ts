import { expect, describe, it } from 'vitest'
import { isPromise } from './index'

describe('isPromise', () => {
  it('should be truthy', () => {
    expect(isPromise(new Promise(() => {}))).toBeTruthy()
    expect(isPromise(Promise.resolve())).toBeTruthy()
  })
})

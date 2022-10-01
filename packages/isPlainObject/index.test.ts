import { describe, expect, it } from 'vitest'
import { isPlainObject } from './index'

describe('isPlainObject', () => {
  it('isPlainObject test.', () => {
    // eslint-disable-next-line no-new-object
    expect(isPlainObject(new Object())).toBeTruthy()
    expect(isPlainObject({})).toBeTruthy()
    expect(isPlainObject([])).toBeFalsy()
    expect(isPlainObject(null)).toBeFalsy()
    expect(isPlainObject(NaN)).toBeFalsy()
    expect(isPlainObject(() => {})).toBeFalsy()
  })
})

import { expect, test } from 'vitest'
import { typeOf } from './index'

test('Get type tag', () => {
  expect(typeOf([])).toBe('array')
  expect(typeOf({})).toBe('object')
  expect(typeOf(1)).toBe('number')
  expect(typeOf('')).toBe('string')
  expect(typeOf(null)).toBe('null')
  expect(typeOf(undefined)).toBe('undefined')
  expect(typeOf(false)).toBe('boolean')
  expect(typeOf(new Date())).toBe('date')
  expect(typeOf(new Map())).toBe('map')
  expect(typeOf(new Set())).toBe('set')
  expect(typeOf(() => {})).toBe('function')
})

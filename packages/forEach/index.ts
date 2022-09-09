import { isArray } from '../isArray'
import { isObject } from '../isObject'
/**
 * 遍历对象和数组
 *
 * `forEach([1, 2, 3], (v, index) => { console.log(v, index) })`
 *
 *  //=> 1 2 3
 *
 * `forEach({ a:1, b:2, c:3 }, (v, key) => { console.log(v, key) })`
 *
 * //=> 1a 2b 3c
 *
 * @param data
 * @param fn
 */
export function forEach<T extends []>(source: T, fn: (value: T[number], index: number, source: T) => void): void
export function forEach<T extends {}>(source: T, fn: (value: T[keyof T], key: keyof T, source: T) => void, config?: { symbol?: boolean }): void
export function forEach<T>(source: T, fn: (value: any, index: any, source: T) => void, config?: { symbol?: boolean }) {
  if (isArray(source)) {
    const len = source.length
    for (let index = 0; index < len; index++)
      fn(source[index], index, source)
  }
  else if (isObject(source)) {
    const keys = Object.keys(source)
    for (let index = 0, len = keys.length; index < len; index++) {
      const key = keys[index]
      fn(source[key], key, source)
    }
    if (config?.symbol) {
      const symbolKeys = Object.getOwnPropertySymbols(source)
      if (symbolKeys.length)
        forEach(symbolKeys, key => fn(source[key as unknown as string], key, source))
    }
  }
}

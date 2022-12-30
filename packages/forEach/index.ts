import { typeOf } from '../typeOf'
/**
 * 遍历对象和数组
 *
 * `forEach([1, 2, 3], (v, index) => { console.log(v, index) })`
 *
 *  //=> 10 21 32
 *
 * `forEach({ a:1, b:2, c:3 }, (v, key) => { console.log(v, key) })`
 *
 * //=> 1a 2b 3c
 *
 * @param data
 * @param fn
 */
export function forEach<T extends Array<any>>(source: T, fn: (value: T[number], index: number, source: T) => void): void
export function forEach<T extends string>(source: T, fn: (value: T[number], index: number, source: T) => void): void
export function forEach<T extends Record<PropertyKey, any>>(source: T, fn: (value: T[keyof T], key: keyof T, source: T) => void, config?: { symbol?: boolean }): void
export function forEach<T extends Map<any, any>>(source: T, fn: (value: T[keyof T], key: keyof T, source: T) => void): void
export function forEach<T extends Set<any>>(source: T, fn: (value: T[keyof T], key: number, source: T) => void): void
export function forEach<T>(source: T, fn: (value: any, index: any, source: T) => void, config?: { symbol?: boolean }) {
  switch (typeOf(source)) {
    case 'array':
    case 'string':{
      const len = (source as unknown as []).length
      for (let index = 0; index < len; index++)
        fn((source as unknown as [])[index], index, source)
      break
    }
    case 'object': {
      let keys = Object.keys(source as any)

      if (config?.symbol)
        keys = keys.concat(Object.getOwnPropertySymbols(source) as any)

      for (let index = 0, len = keys.length; index < len; index++) {
        const key = keys[index]
        // @ts-ignore
        fn(source[key], key, source)
      }

      break
    }
    case 'map':
      forEach(Array.from(source as unknown as Map<any, any>), ([key, value]) => fn(value, key, source))
      break
    case 'set':
      forEach(Array.from(source as unknown as Set<any>), (value, index) => fn(value, index, source))
      break
  }
}

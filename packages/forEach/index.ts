import { isObject } from '../isObject'

type ForEachIterate<T> = (item: any, index: number | string, data: T) => void
type ForEachData = any[] | Record<any, any>
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
 * @param iterate
 * @param context
 */
export function forEach<T extends ForEachData>(
  data: T,
  iterate: ForEachIterate<T>,
  context?: any,
): void {
  if (data) {
    if (Array.isArray(data)) {
      let len = data.length
      while (len) {
        const index = len - 1
        iterate.call(context, data[index], index, data)
        len--
      }
    }
    else if (isObject(data)) {
      for (const key in data) {
        if (Reflect.has(data, key))
          iterate.call(context, data[key], key, data)
      }
    }
  }
}

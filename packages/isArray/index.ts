import { typeOf } from '../typeOf'
/**
 * 判断是否是数组类型
 *
 * `isArray([])`
 * // => true
 *
 * @param arr
 */
export function isArray(arr: unknown): arr is Array<any> {
  if (Array.isArray) return Array.isArray(arr)
  return typeOf(arr) === 'array'
}

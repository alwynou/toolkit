import { typeOf } from '../typeOf'

/**
 * 判断是否是真正的对象类型(严格判断)
 *
 * `isPlainObject({})`
 * // => true
 *
 * `isPlainObject([])`
 * // => false
 *
 * @param obj
 */
export function isPlainObject(obj: unknown): obj is Record<any, any> {
  return typeOf(obj) === 'object'
}

import { typeOf } from '../typeOf';

/**
 * 判断是否是真正的对象类型(严格判断)
 *
 * `isObject({})`
 * // => true
 *
 * `isObject([])`
 * // => false
 *
 * @param obj
 */
export function isObject(obj: unknown): obj is Record<any, any> {
  return typeOf(obj) === 'object'
}

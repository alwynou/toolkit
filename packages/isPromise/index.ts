import { isFunction } from '../isFunction'
import { isObjectType } from '../isObjectType'

/**
 * 判断是否是Promise类型
 *
 * `isPromise(new Promise())`
 * // => true
 *
 * `isPromise(Promise.resolve())`
 * // => true
 *
 * `isPromise(Promise.reject())`
 * // => true
 *
 * @param promise
 */
export function isPromise<T = any>(promise: unknown): promise is Promise<T> {
  return isObjectType(promise) && isFunction(promise.then) && isFunction(promise.catch)
}

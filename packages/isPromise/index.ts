import { isFunction } from '../isFunction'
import { isObject } from '../isObject'
import { typeOf } from '../typeOf'

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
  return typeOf(promise) === 'promise' || (isObject(promise) && isFunction(promise.then) && isFunction(promise.catch))
}

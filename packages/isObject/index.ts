/**
 * 判断是否是对象类型（`null`不为对象类型），注意: `array`也为对象。
 *
 * `isObject([])`
 *  //=> true
 *
 * `isObject({})`
 * //=> true
 *
 * `isObject(null)`
 * //=> false
 *
 * `isObject(1)`
 * //=> false
 *
 * @param obj
 */
export function isObject(obj: unknown): obj is Record<any, any> {
  return obj !== null && typeof obj === 'object'
}

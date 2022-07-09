/**
 * 判断是否是对象类型（`null`不为对象类型），注意: `array`也为对象。
 *
 * `isObjectType([])`
 *  //=> true
 *
 * `isObjectType({})`
 * //=> true
 *
 * `isObjectType(null)`
 * //=> false
 *
 * `isObjectType(1)`
 * //=> false
 *
 * @param obj
 */
export function isObjectType(obj: unknown): obj is Record<any, any> {
  return obj !== null && typeof obj === 'object'
}

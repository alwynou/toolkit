/**
 * 判断是否是字符类型
 *
 * `isString('')`
 * // => true
 *
 * `isString(1)`
 * //=> false
 *
 * @param str
 */
export function isString(str: unknown): str is string {
  return typeof str === 'string'
}

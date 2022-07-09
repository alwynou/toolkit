/**
 * 判断是否是数字类型
 *
 * `isNumber(0)`
 * // => true
 *
 * `isNumber(-1)`
 * // => true
 *
 * `isNumber(NaN)`
 * // => true
 *
 * `isNumber('1')`
 * // => false
 *
 * @param num
 */
export function isNumber(num: unknown): num is number {
  return typeof num === 'number'
}

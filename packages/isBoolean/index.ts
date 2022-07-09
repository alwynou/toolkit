/**
 * 判断是否是布尔类型
 *
 * `isBoolean(true)`
 * // => true
 *
 * `isBoolean(1)`
 * // => false
 *
 * @param bol
 */
export function isBoolean(bol: unknown): bol is boolean {
  return typeof bol === 'boolean'
}

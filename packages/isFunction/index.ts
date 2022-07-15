/**
 * 判断是否是函数类型
 *
 * `isFunction(()=>{})`
 *  // => true
 *
 * @param fn
 */
export function isFunction(fn: unknown): fn is Function {
  return typeof fn === 'function'
}

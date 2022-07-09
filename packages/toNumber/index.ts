import { isNumber } from '../isNumber'
import { typeOf } from '../typeOf'

/**
 * 转换值为数字类型
 *
 * `toNumber('1')`
 * //=> 1
 *
 * `toNumber('1abc')`
 * //=> 1
 *
 * `toNumber(Symbol())`
 * //=> NaN
 *
 * @param target
 * @returns
 */
export function toNumber(target: any): number {
  if (isNumber(target)) return target
  if (typeOf(target) === 'symbol') return NaN

  return parseFloat(target)
}

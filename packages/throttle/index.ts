/**
 * @fork https://github.com/lodash/lodash/blob/master/throttle.js
 */

import { debounce } from '../debounce'
import type { DebounceOptions, DebounceReturnType, Handler } from '../debounce'
import { isPlainObject } from '../isPlainObject'

type ThrottleReturnType<T extends Handler> = DebounceReturnType<T>

/**
 * 节流函数，一段时间见内只执行一次
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object} options
 * @param {Boolean} [options.leading = true]
 * @param {Boolean} [options.trailing = true]
 * @returns
 */
export function throttle<T extends Handler>(
  func: T,
  wait: number,
  options: DebounceOptions,
): ThrottleReturnType<T> {
  let leading = true
  let trailing = true

  if (isPlainObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  })
}

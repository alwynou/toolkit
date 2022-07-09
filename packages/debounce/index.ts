/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
import { isObject } from '../isObject'

export type Handler = (...args: any[]) => any
export type HandlerNoRet = (...args: any[]) => void

const now = () => Date.now()

/**
 * @fork https://github.com/lodash/lodash/blob/master/debounce.js
 */

export type DebounceOptions = {
  // 前置执行
  leading?: boolean
  // 后置执行
  trailing?: boolean
  // 只对 debounce 有效，在一直被延迟执行情况下 可保证最大等待时间内被执行一次
  maxWait?: number
}

export type DebounceReturnType<T extends Handler> = {
  (...args: Parameters<T>): ReturnType<T>
  cancel: HandlerNoRet
  flush: HandlerNoRet
}

/**
 * 防抖函数，一段时间内多次执行只执行最后一次
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object} options
 * @param {Boolean} [options.leading = false]
 * @param {Boolean} [options.trailing = true]
 * @param {number} [options.maxWait]
 * @returns
 */
export function debounce<T extends Handler>(
  func: T,
  wait: number,
  options?: DebounceOptions
): DebounceReturnType<T> {
  let lastArgs: any
  let lastThis: any
  let maxWait: any
  let result: ReturnType<T>
  let timerId: any
  let lastCallTime: any
  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  wait = Number(wait) || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    // eslint-disable-next-line no-use-before-define
    timerId = setTimeout(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined
      || timeSinceLastCall >= wait
      || timeSinceLastCall < 0
      || (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  // eslint-disable-next-line consistent-return
  function timerExpired() {
    const time = now()
    // eslint-disable-next-line no-use-before-define
    if (shouldInvoke(time)) return trailingEdge(time)

    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time: number) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) return invokeFunc(time)

    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) clearTimeout(timerId)

    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now())
  }

  function debounced(this: any, ...args: Parameters<T>) {
    const time = now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) return leadingEdge(lastCallTime)

      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId)
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) timerId = setTimeout(timerExpired, wait)

    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

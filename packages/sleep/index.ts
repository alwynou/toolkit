export type SleepReturnType<T> = ReturnType<() => Promise<T>>
type SleepExecutor<T> = () => T

/**
 * 等待指定时间再执行之后程序
 *
 * ```
 * async () => {
 *  await sleep(1000)
 *  // ...之后逻辑
 * }
 * ```
 *
 * 重载1
 *
 * @param wait
 */
export function sleep(wait: number): Promise<undefined>
/**
 * 等待指定时间后执行传入函数
 *
 * ```
 * async () => {
 *  const executor = () => 'sleep done'
 *  const ret = await sleep(1000, executor)
 *  // 'sleep done'
 * }
 * ```
 *
 * 重载2
 *
 * @param wait
 * @param fn
 */
export function sleep<T>(wait: number, fn: SleepExecutor<T>): Promise<T>
export function sleep<T>(wait: number, fn?: SleepExecutor<T>): SleepReturnType<T> {
  return new Promise((resolve) => {
    let executor = resolve

    if (fn)
      executor = () => resolve(fn())

    setTimeout(executor, wait)
  })
}

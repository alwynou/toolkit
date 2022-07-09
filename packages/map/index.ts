type IterateFn<T> = (item: any, index: number | string, data: T) => any
type IterateSyncFn<T> = (item: any, index: number | string, data: T) => Promise<any>

export async function map<T extends Array<any>>(
  data: T,
  iterate: IterateFn<T> | IterateSyncFn<T>,
  context?: any
) {
  const rets: any[] = []
  let len = data.length
  while (len) {
    const index = len - 1
    try {
      // eslint-disable-next-line no-await-in-loop
      const ret = await iterate.call(context, data[index], index, data)
      rets.unshift(ret)
    } catch (error) {
      rets.unshift(null)
    }
    len--
  }
  return rets
}

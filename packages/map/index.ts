type IterateFn<T> = (item: any, index: number | string, data: T) => any
type IterateSyncFn<T> = (item: any, index: number | string, data: T) => Promise<any>

export async function map<T extends Array<any>>(
  data: T,
  iterate: IterateFn<T> | IterateSyncFn<T>,
) {
  const rets: any[] = []
  let len = data.length
  while (len) {
    const index = len - 1
    try {
      const ret = await iterate(data[index], index, data)
      rets.unshift(ret)
    }
    catch (error) {
      rets.unshift(null)
    }
    len--
  }
  return rets
}

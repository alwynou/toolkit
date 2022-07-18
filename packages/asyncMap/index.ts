type IterateFn<T> = (item: any, index: number | string, data: T) => any
type IterateSyncFn<T> = (item: any, index: number | string, data: T) => Promise<any>

export async function asyncMap<T extends Array<any>>(
  data: T,
  iterate: IterateFn<T> | IterateSyncFn<T>,
) {
  const ret: any[] = []
  let len = data.length
  while (len) {
    const index = len - 1
    try {
      const ret = await iterate(data[index], index, data)
      ret.unshift(ret)
    }
    catch (error) {
      ret.unshift(null)
    }
    len--
  }
  return ret
}

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
      const r = await iterate(data[index], index, data)
      ret.unshift(r)
    }
    catch (error) {
      ret.unshift(null)
    }
    len--
  }
  return ret
}

type IterateFn<T> = (item: any, index: number | string, data: T) => any
type IterateSyncFn<T> = (item: any, index: number | string, data: T) => Promise<any>

export async function asyncMap<T extends Array<any>>(
  data: T,
  iterate: IterateFn<T> | IterateSyncFn<T>,
) {
  const len = data.length
  const ret = new Array(len)
  let index = 0
  while (index < len) {
    const r = await iterate(data[index], index, data)
    ret[index] = r
    index++
  }
  return ret
}

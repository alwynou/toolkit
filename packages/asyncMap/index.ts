type IterateFn<T> = (item: any, index: number | string, data: T) => any
type IterateSyncFn<T> = (item: any, index: number | string, data: T) => Promise<any>

export async function asyncMap<T extends Array<any>>(
  data: T,
  iterate: IterateFn<T> | IterateSyncFn<T>,
) {
  const len = data.length
  const ret: any[] = new Array(len).fill(null)
  let index = 0
  while (index < len) {
    try {
      const r = await iterate(data[index], index, data)
      ret[index] = r
    }
    catch (error) {
      ret[index] = null
    }
    index++
  }
  return ret
}

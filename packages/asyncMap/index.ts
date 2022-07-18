type IterateFn<T> = (item: any, index: number | string, data: T) => any
type IterateSyncFn<T> = (item: any, index: number | string, data: T) => Promise<any>

export async function asyncMap<T extends Array<any>>(
  data: T,
  iterate: IterateFn<T> | IterateSyncFn<T>,
) {
  const ret: any[] = []
  const len = data.length
  let index = 0
  while (index < len) {
    try {
      const r = await iterate(data[index], index, data)
      ret.push(r)
    }
    catch (error) {
      ret.push(null)
    }
    index++
  }
  return ret
}

type ForEachIterate<T> = (item: any, index: number | string, data: T) => void
type ForEachData = any[] | Record<any, any>
interface ForEachConfig {
  symbol?: boolean
}
/**
 * 遍历对象和数组
 *
 * `forEach([1, 2, 3], (v, index) => { console.log(v, index) })`
 *
 *  //=> 1 2 3
 *
 * `forEach({ a:1, b:2, c:3 }, (v, key) => { console.log(v, key) })`
 *
 * //=> 1a 2b 3c
 *
 * @param data
 * @param iterate
 * @param context
 */
export function forEach<T extends ForEachData>(
  data: T,
  iterate: ForEachIterate<T>,
  context?: any,
  config?: ForEachConfig,
): void {
  if (data) {
    const _context = context || data

    if (Array.isArray(data)) {
      // performance optimization
      let index = 0
      const arrLen = data.length
      while (index < arrLen) {
        iterate.call(_context, data[index], index, data)
        index++
      }
    }
    else {
      for (const key in data) {
        if (Reflect.has(data, key))
          iterate.call(_context, data[key], key, data)
      }
      if (config?.symbol) {
        // for symbol property
        const symbolKeys = Object.getOwnPropertySymbols(data)
        if (symbolKeys.length) {
          forEach(symbolKeys, function (this: any, key) {
            iterate.call(this, data[key], key, data)
          }, context)
        }
      }
    }
  }
}

import { isObject } from '../isObject'
import { isObjectType } from '../isObjectType'
import { omit } from '../omit'
import { pick } from '../pick'

interface TreeMapOption {
  childKey?: string
  /**
   * 严格模式
   *  - 对于源数据中通层级对象存在不同类型数据进行过滤
   *    - 比如： `[{},{},1]` => `[{},{}]`
   *
   *  - 对于返回的是`falsy`值的自动返回原对象值
   */
  strict?: boolean
  pickKeys?: string[]
  omitKeys?: string[]
}

type TreeMapIterate<T> = (tree: T, index: number, source: T[]) => T
type treeItem = Record<string, any>

export function treeMap<T extends treeItem | Array<treeItem>>(
  source: T,
  iterate: TreeMapIterate<treeItem>,
  options: TreeMapOption = {},
): T {
  if (!isObjectType(source))
    return source

  let treeSource: Array<treeItem>
  const isArraySource = Array.isArray(source)

  if (isArraySource)
    treeSource = source
  else
    treeSource = [source]

  const { childKey = 'children', strict = true } = options

  const pickKeys = options.pickKeys && Array.from(new Set(options.pickKeys.concat(childKey)))
  const omitKeys = options.omitKeys

  function innerMap(tree: Array<treeItem>): Array<treeItem> {
    let needFilter = false
    const rawRet = tree.map((item, index, source) => {
      if (!isObject(item)) {
        needFilter = true
        return strict ? null as any : item
      }

      if (Array.isArray(item[childKey]))
        item[childKey] = innerMap(item[childKey])

      let rawRet = iterate(item, index, source) || (strict ? item : undefined)

      if (pickKeys)
        rawRet = pick(rawRet, pickKeys)
      else if (omitKeys)
        rawRet = omit(rawRet, omitKeys)

      return rawRet
    })

    if (strict && needFilter)
      return rawRet.filter(Boolean)

    return rawRet
  }

  const ret = innerMap(treeSource)

  return (isArraySource ? ret : ret[0]) as T
}

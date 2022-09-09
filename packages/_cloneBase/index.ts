import { forEach } from '../forEach'
import { typeOf } from '../typeOf'

function getCtorObject(val: any, args?: any) {
  // eslint-disable-next-line no-proto
  const Ctor = val.__proto__.constructor
  return args ? new Ctor(args) : new Ctor()
}

type CacheClone = WeakMap<any, any>
function handleValueClone(item: any, isDeep: boolean, cache: CacheClone) {
  return isDeep ? cloneValue(item, isDeep, cache) : item
}

function cloneSymbol(sym: Symbol): Symbol {
  const symStr = sym.toString()
  return Symbol(symStr.replace(/\w+\((.*)\)/, '$1'))
}

function cloneValue<T>(val: T, isDeep: boolean, cache: CacheClone) {
  if (val) {
    const cacheVal = cache.get(val)
    if (cacheVal)
      return cacheVal

    switch (typeOf(val)) {
      case 'object':
      case 'array':
      case 'arguments': {
        let arg
        if (Array.isArray(val))
          arg = val.length

        const restObj = getCtorObject(val, arg)
        cache.set(val, restObj)
        forEach(val, (item, key) => {
          restObj[key] = handleValueClone(item, isDeep, cache)
        }, { symbol: true })
        return restObj
      }
      case 'date':
      case 'regExp': {
        return getCtorObject(val, (val as any).valueOf())
      }
      case 'function': {
        // eslint-disable-next-line no-new-func
        const fn = new Function(`return ${val}`)() as any
        forEach(val, (value, key) => {
          fn[key] = handleValueClone(value, isDeep, cache)
        }, { symbol: true })
        return fn
      }
      case 'symbol': {
        return cloneSymbol(val as unknown as Symbol)
      }
      case 'set': {
        const restSet = getCtorObject(val)
        cache.set(val, restSet);
        (val as unknown as Set<any>).forEach((item: any) => {
          restSet.add(handleValueClone(item, isDeep, cache))
        })
        return restSet
      }
      case 'map': {
        const restMap = getCtorObject(val)
        cache.set(val, restMap);
        (val as unknown as Map<any, any>).forEach((item: any) => {
          restMap.set(handleValueClone(item, isDeep, cache))
        })
        return restMap
      }
      default:
        return val
    }
  }
  return val
}

export function cloneBase<T>(obj: T, deep: boolean): T {
  if (obj)
    return cloneValue(obj, deep, new WeakMap())
  return obj
}

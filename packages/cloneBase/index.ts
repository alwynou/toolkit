import { forEach } from '../forEach'
import { typeOf } from '../typeOf'

function getCtorObject(val: any, args?: any) {
  // eslint-disable-next-line no-proto
  const Ctor = val.__proto__.constructor
  return args ? new Ctor(args) : new Ctor()
}

function handleValueClone(item: any, isDeep: boolean) {
  // eslint-disable-next-line no-use-before-define
  return isDeep ? cloneValue(item, isDeep) : item
}

function cloneValue<T>(val: T, isDeep: boolean) {
  if (val) {
    switch (typeOf(val)) {
      case 'object':
      case 'arguments': {
        const restObj = getCtorObject(val)
        forEach(val, (item, key) => {
          restObj[key] = handleValueClone(item, isDeep)
        })
        return restObj
      }
      case 'date':
      case 'regExp': {
        return getCtorObject(val, (val as any).valueOf())
      }
      case 'array': {
        const restArr: any[] = new Array((val as any).length)
        forEach(val, (item, index) => {
          restArr[index as any] = handleValueClone(item, isDeep)
        })
        return restArr
      }
      case 'set': {
        const restSet = getCtorObject(val)
        restSet.forEach((item: any) => {
          restSet.add(handleValueClone(item, isDeep))
        })
        return restSet
      }
      case 'map': {
        const restMap = getCtorObject(val)
        restMap.forEach((item: any) => {
          restMap.set(handleValueClone(item, isDeep))
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
  if (obj) return cloneValue(obj, deep)

  return obj
}

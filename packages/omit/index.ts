import { isArray } from '../isArray'

/**
 * 忽略对象部分属性
 *
 * `omit({ a:1, b:2 }, 'a')`
 *  // => { b: 2 }
 *
 * `omit({ a: 1, b: 2, c: 3 }, ['a','b'])`
 *  // => { c: 3 }
 *
 * @param obj
 * @param keys
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[] | K = []): Omit<T, K> {
  if (!isArray(keys))
    keys = [keys]

  const cloneObj = { ...obj }
  if (Object.keys(obj).length === keys.length)
    return cloneObj
  keys.forEach(key => Reflect.deleteProperty(cloneObj, key))

  return cloneObj
}

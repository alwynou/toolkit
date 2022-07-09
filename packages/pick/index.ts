import { isArray } from '../isArray'

/**
 * 选择对象部分属性
 *
 * `pick({ a: 1, b: 2, c: 3 }, 'a')`
 * // => { a: 1 }
 *
 * `pick({ a:1, b:2, c:3 }, ['a','c'])`
 * // => { a: 1, c: 1 }
 *
 * @param obj
 * @param keys
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[] | K = []): Pick<T, K> {
  // eslint-disable-next-line no-param-reassign
  if (!isArray(keys)) keys = [keys]

  if (Object.keys(obj).length === keys.length) return { ...obj }

  const cloneObj = {} as Pick<T, K>
  // eslint-disable-next-line no-return-assign
  keys.forEach((k) => (cloneObj[k] = obj[k]))

  return cloneObj
}

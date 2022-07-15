import { isObjectType } from '../isObjectType'

type Get<T, K> = K extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? Get<T[L], R>
    : undefined
  : K extends keyof T
    ? T[K]
    : undefined

export function get<T extends object, K extends string>(obj: T, path: K): Get<T, K> {
  const pathArr = path.split('.')
  let curValue = obj as unknown as any
  while (pathArr.length && isObjectType(curValue)) {
    const curKey = pathArr.shift()!
    curValue = curValue[curKey]
  }
  return curValue
}

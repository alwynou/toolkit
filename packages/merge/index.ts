import { forEach } from '../forEach'
import { isPlainObject } from '../isPlainObject'
import { typeOf } from '../typeOf'

export function merge<A, B>(defaultObj: A, otherObj: B): A & B
export function merge<A, B, C>(defaultObj: A, otherObj: B, otherObj1: C): A & B & C
export function merge<A, B, C, D>(defaultObj: A, otherObj: B, otherObj1: C, otherObj2: D): A & B & C & D
export function merge<A, B, C, D, E>(defaultObj: A, otherObj: B, otherObj1: C, otherObj2: D, otherObj3: E): A & B & C & D & E
export function merge(...args: any[]): any {
  let index = 0
  const argLen = args.length
  let result = args[index]
  while (index < argLen)
    result = mergeImp(result, args[++index])
  return result
}

const isObject = (t: string) => ['array', 'object'].includes(t)
const copyData = (v: any) => Array.isArray(v) ? [...v] : isPlainObject(v) ? { ...v } : v

function mergeImp(_pre: any, _next: any) {
  const next = copyData(_next)
  if (!_pre)
    return next

  const pre = copyData(_pre)

  forEach(next, (value, keyOrIndex) => {
    if (isObject(typeOf(value)))
      pre[keyOrIndex] = merge(pre[keyOrIndex], value)
    else
      pre[keyOrIndex] = value
  })

  return pre
}

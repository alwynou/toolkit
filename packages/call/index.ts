import { isFunction } from '../isFunction'

export function call<F>(maybeFn: F, ...args: any[]): F extends () => infer R ? R : F
export function call<F extends Function>(context: any, maybeFn: F, ...args: any[]): F extends () => infer R ? R : any
export function call(context: any, maybeFn?: any, ...args: any[]) {
  if (isFunction(context)) {
    maybeFn = context
    context = undefined
    // eslint-disable-next-line prefer-rest-params
    args = [...arguments].slice(1)
  }
  else if (!isFunction(maybeFn)) {
    maybeFn = context
  }
  return isFunction(maybeFn) ? maybeFn.call(context, ...args) : maybeFn
}

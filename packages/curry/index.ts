/* eslint-disable @typescript-eslint/no-unused-vars */
type Cut<
  T extends any[],
  U extends any[],
  Acc extends any[] = []
  > = U extends [infer UH, ...infer UR]
  ? T extends [infer TH, ...infer TR]
  ? Cut<TR, UR, Acc>
  : never
  : T extends [infer TH, ...infer TR]
  ? Cut<TR, [], [...Acc, TH]>
  : Acc
type Slice<T> = T extends [infer x, ...infer xs] ? [x, ...Slice<xs>] | [x] : never;
type Curry<T extends any[], R> = T extends [infer Head, ...infer Rest]
  ? <S extends Slice<Rest> | []>(arg: Head, ...args: S) => Curry<Cut<Rest, S>, R>
  : R;

export function curry<T extends any[], R>(fn: (...args: T) => R): Curry<T, R> {
  const next = (...args: any[]) => {
    if (args.length >= fn.length) {
      return fn(...args as T)
    }
    return (...arg: any[]) => next(...args, ...arg)
  }

  return next as any
}

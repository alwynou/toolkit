export function plimit(concurrenceNum = 4) {
  const queue = [] as any
  let curCount = 0

  const next = () => {
    curCount--
    queue.length > 0 && queue.shift()()
  }

  async function run(fn: Function, resolve: Function, ...args: any) {
    curCount++
    const ret = (async () => fn(...args))()
    resolve(ret)
    try {
      await ret
    }
    catch (error) {
      console.error(error)
    }
    finally {
      next()
    }
  }

  function limit<
  T extends Function,
  P = T extends (...args: any[]) => Promise<infer X> ? X : any,
  >(fn: T, ...args: any): Promise<P> {
    return new Promise((resolve) => {
      queue.push(run.bind(null, fn, resolve, ...args))
      if (concurrenceNum > curCount && queue.length > 0)
        queue.shift()()
    })
  }

  return limit
}


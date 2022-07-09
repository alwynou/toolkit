import { describe, it, expect } from 'vitest';
import { sleep } from './index';

describe('sleep', () => {
  it('sleep 1s', async () => {
    const start = Date.now()
    const ret = await sleep(1000)
    const end = Date.now()
    const diff = end - start
    expect(diff).toBeGreaterThanOrEqual(1000)
    expect(diff).toBeLessThanOrEqual(1100)
    expect(ret).toBeUndefined()
  })

  it('sleep 1s & get callback value', async () => {
    const callback = () => 'sleep'
    const start = Date.now()
    const ret = await sleep(1000, callback)
    const end = Date.now()
    const diff = end - start
    expect(diff).toBeGreaterThanOrEqual(1000)
    expect(diff).toBeLessThanOrEqual(1100)
    expect(ret).toBe('sleep')
  })
})

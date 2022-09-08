import { describe, expect, it } from 'vitest'
import { merge } from '.'

describe('omit', () => {
  it('use a string arg to omit one property', () => {
    const obj = {
      a: 1,
      d: { name: 'old', age: 18 },
      g: [{ name: 1 }, 2, 3],
    }
    const otherObj = {
      c: 1,
      d: { name: 'new', aa: 19, class: 'info' },
      g: [{ name: 2, subName: 'subName' }, '2', 4, 'add'],
    }

    expect(merge(obj, otherObj)).toMatchInlineSnapshot(`
      {
        "a": 1,
        "c": 1,
        "d": {
          "aa": 19,
          "age": 18,
          "class": "info",
          "name": "new",
        },
        "g": [
          {
            "name": 2,
            "subName": "subName",
          },
          "2",
          4,
          "add",
        ],
      }
    `)
  })
})

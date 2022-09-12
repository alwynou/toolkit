import { isObjectType } from '../isObjectType'

export function tree<T extends {} | []>(
  source: T,
  fn: (data: any, parent: any) => void,
  config: { key?: string } = {},
) {
  const { key: childKey = 'children' } = config

  function treeLoop(_source: T, parent?: T) {
    if (!isObjectType(_source))
      return

    const source = Array.isArray(_source) ? _source : [_source]
    for (let index = 0, len = source.length; index < len; index++) {
      const itemData = source[index]
      fn(itemData, parent)
      if (childKey in itemData)
        treeLoop(itemData[childKey], itemData)
    }
  }

  treeLoop(source)
}

export function typeOf(value:unknown):string {
  const type = typeof value
  if (type !== 'object') return type
  return Object.prototype.toString
    .call(value).slice(8, -1)
    .toLowerCase()
    .replace(/\s/g, '')
}

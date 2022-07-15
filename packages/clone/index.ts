import { cloneBase } from '../cloneBase'

/**
 * 浅拷贝
 *
 * @param data
 */
export function clone<T>(data: T): T {
  return cloneBase(data, false)
}

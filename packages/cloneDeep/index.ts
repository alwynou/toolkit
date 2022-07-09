import { cloneBase } from '../cloneBase';

/**
 * 深拷贝（不支持递归数据）
 *
 * @param data
 */
export function cloneDeep<T>(data: T): T {
  return cloneBase(data, true)
}

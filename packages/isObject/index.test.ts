import { describe, it, expect } from 'vitest';
import { isObject } from './index';

describe('isObject', () => {
  it('it just allow truly object pass.', () => {
    // eslint-disable-next-line no-new-object
    expect(isObject(new Object())).toBeTruthy();
    expect(isObject({})).toBeTruthy();
    expect(isObject([])).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(NaN)).toBeFalsy();
    expect(isObject(() => {})).toBeFalsy();
  });
});

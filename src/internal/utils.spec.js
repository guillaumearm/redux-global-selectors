import { is } from './utils';

describe('utils', () => {
  describe('is', () => {
    const isString = is('string');
    it('shouls return a function', () => {
      expect(typeof isString).toBe('function')
    });
    it('checks the type', () => {
      expect(isString(true)).toBe(false);
      expect(isString('hello world')).toBe(true);
    });
  });
});

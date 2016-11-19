import { prop } from 'ramda';
import { withSelectors } from 'src/redux-global-selectors'

describe('redux-global-selectors', () => {
  describe('withSelectors', () => {

    const state = { firstName: 'Bruce', lastName: 'Wayne' };
    const store = {
      getState: () => state,
    };
    const selectors = {
      fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
      some: { nested: { selectors: { yolo: () => true } } },
    }
    const enhancedStore = withSelectors(selectors)(store);

    describe('getState', () => {
      const { getState } = enhancedStore;
      it('returns the state', () => {
        expect(getState()).toEqual(state);
      });

      it('returns undefined', () => {
        expect(getState('unknown selectors')).toBe(undefined);
      });

      it('returns the fullName', () => {
        expect(getState('fullName')).toBe('Bruce Wayne');
      });

      it('returns the firstName when passing a selector to getState()', () => {
        expect(getState(prop('firstName'))).toBe(state.firstName);
      });

      it('can access to a nested property', () => {
        expect(getState('some.nested.selectors.yolo')).toBe(true);
      });

      it('returns undefined when a propery is unknow', () => {
        expect(getState('unknow')).toBe(undefined);
      });

      it('returns undefined when a nested propery is unknow', () => {
        expect(getState('some.unknow.nested.selectors.yolo')).toBe(undefined);
      });
    });

    describe('errors', () => {
      it('throws an error if first parameter is not a plain object', () => {
        expect(() => withSelectors()).toThrowError(/must be a plain object/);
        expect(() => withSelectors({})).not.toThrow();
      });
      it('throws an error if selectors are not function', () => {
        expect(() => withSelectors({ test: () => true })).not.toThrow();
        expect(() => withSelectors({ test: true })).toThrowError(/must be a function/);
      });
    });
  });
});

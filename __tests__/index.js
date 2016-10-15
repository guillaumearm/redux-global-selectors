import { withSelectors } from 'src/redux-with-selectors'

describe('redux-with-selectors', () => {
  describe('withSelectors', () => {

    const state = { firstName: 'Bruce', lastName: 'Wayne' }
    const store = {
      getState: () => state,
    };
    const selectors = { fullName: ({ firstName, lastName }) => `${firstName} ${lastName}` }
    const enhancedStore = withSelectors(selectors)(store);

    describe('getState', () => {
      const { getState } = enhancedStore;
      it('returns the state', () => {
        expect(getState()).toEqual(state);
      });

      it('returns the fullName', () => {
        expect(getState('unknown selectors')).toBe(undefined);
      });

      it('returns undefined', () => {
        expect(getState('fullName')).toBe('Bruce Wayne');
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

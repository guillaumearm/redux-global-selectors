import { withSelectors } from 'src/redux-with-selectors'

// import { isString, isObject, isFunction } from './private';
//
// const MUST_BE_AN_OBJECT = 'redux-with-selectors : selectors must be a plain object.';
// const MUST_BE_A_STRING = 'redux-with-selectors : selectorKeys must be a string.';
// const MUST_BE_A_FUNC = 'redux-with-selectors : a selector must be a function.';
// const error = msg => { throw new Error(msg) };
//
// const checkSelectors = s => {
//   if (!isObject(s)) error(MUST_BE_AN_OBJECT);
//   Object.keys(s).forEach(selectorKey => {
//     if (!isString(selectorKey)) error(MUST_BE_A_STRING);
//   });
//   Object.values(s).forEach(selector => {
//     if (!isFunction(selector)) error(MUST_BE_A_FUNC);
//   });
// };
//
// export const withSelectors = selectors => store => {
//   checkSelectors(selectors)
//   return {
//     ...store,
//     getState: (selectorKey, ...additionalParameters) => {
//       const state = store.getState();
//       const selector = selectors[selectorKey];
//       return selector ? selector(state, ...additionalParameters) : state;
//     },
//   };
// };

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

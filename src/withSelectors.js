import { isObject, isFunction } from './internal';

const MUST_BE_AN_OBJECT = 'redux-with-selectors : selectors must be a plain object.';
const MUST_BE_A_FUNC = 'redux-with-selectors : a selector must be a function.';
const error = msg => { throw new Error(msg) };

const checkSelectors = s => {
  if (!isObject(s)) error(MUST_BE_AN_OBJECT);
  Object.values(s).forEach(selector => {
    if (!isFunction(selector)) error(MUST_BE_A_FUNC);
  });
};

export const withSelectors = selectors => {
  checkSelectors(selectors)
  return store => {
    return {
      ...store,
      getState: (selectorKey, ...additionalParameters) => {
        const state = store.getState();
        const selector = selectors[selectorKey];
        if (isFunction(selectorKey)) return selectorKey(state, ...additionalParameters);
        if (selectorKey && !selector) return undefined;
        return selector ? selector(state, ...additionalParameters) : state;
      },
    };
  };
};

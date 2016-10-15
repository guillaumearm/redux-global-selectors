import { isString, isObject, isFunction } from './private';

const MUST_BE_AN_OBJECT = 'redux-with-selectors : selectors must be a plain object.';
const MUST_BE_A_STRING = 'redux-with-selectors : selectorKeys must be a string.';
const MUST_BE_A_FUNC = 'redux-with-selectors : a selector must be a function.';
const error = msg => { throw new Error(msg) };

const checkSelectors = s => {
  if (!isObject(s)) error(MUST_BE_AN_OBJECT);
  Object.keys(s).forEach(selectorKey => {
    if (!isString(selectorKey)) error(MUST_BE_A_STRING);
  });
  Object.values(s).forEach(selector => {
    if (!isFunction(selector)) error(MUST_BE_A_FUNC);
  });
};

export const withSelectors = selectors => store => {
  checkSelectors(selectors)
  return {
    ...store,
    getState: (selectorKey, ...additionalParameters) => {
      const state = store.getState();
      const selector = selectors[selectorKey];
      return selector ? selector(state, ...additionalParameters) : state;
    },
  };
};

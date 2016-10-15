const is = type => x => typeof x === type;
const isString = is('string');
const isFunction = is('function');
const isObject = is('object');

const MUST_BE_AN_OBJECT = 'redux-with-selectors : selectors must be a plain object.';
const MUST_BE_A_STRING = 'redux-with-selectors : selectorKeys must be a string.';
const MUST_BE_A_FUNC = 'redux-with-selectors : a selector must be a function.';
const error = msg => { throw new Error(msg) };

const checkSelectors = s => {
  if (!isObject(s)) error(MUST_BE_AN_OBJECT);
  Object.keys(s).forEach(k => {
    if (!isString(k)) error(MUST_BE_A_STRING);
  });
  Object.values(s).forEach(v => {
    if (!isFunction(v)) error(MUST_BE_A_FUNC);
  });
};

const withSelectors = selectors => store => {
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

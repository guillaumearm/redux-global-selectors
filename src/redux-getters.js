const is = type => x => typeof x === type;
const isFunction = is('function');
const isObject = is('object');

const withSelectors = selectors => store => {
  if (!isObject(selectors)) throw (new Error('redux-getters : selectors must be a plain object.'));
  return {
    ...store,
    getState: (selectorKey, ...additionalParameters) => {
      const state = store.getState();
      const selector = selectors[selectorskey];
      return isFunction(selector) ? selector(state, ...additionalParameters) : state;
    },
  };
};

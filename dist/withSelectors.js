'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSelectors = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _internal = require('./internal');

var MUST_BE_AN_OBJECT = 'redux-with-selectors : selectors must be a plain object.';
var MUST_BE_A_FUNC = 'redux-with-selectors : a selector must be a function.';
var error = function error(msg) {
  throw new Error(msg);
};

var checkSelectors = function checkSelectors(s) {
  if (!(0, _internal.isObject)(s)) error(MUST_BE_AN_OBJECT);
  Object.values(s).forEach(function (selector) {
    if (!(0, _internal.isFunction)(selector)) error(MUST_BE_A_FUNC);
  });
};

var withSelectors = exports.withSelectors = function withSelectors(selectors) {
  checkSelectors(selectors);
  return function (store) {
    return _extends({}, store, {
      getState: function getState(selectorKey) {
        for (var _len = arguments.length, additionalParameters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          additionalParameters[_key - 1] = arguments[_key];
        }

        var state = store.getState();
        var selector = selectors[selectorKey];
        if ((0, _internal.isFunction)(selectorKey)) return selectorKey.apply(undefined, [state].concat(additionalParameters));
        if (selectorKey && !selector) return undefined;
        return selector ? selector.apply(undefined, [state].concat(additionalParameters)) : state;
      }
    });
  };
};
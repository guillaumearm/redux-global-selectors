'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var is = exports.is = function is(type) {
  return function (x) {
    return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === type;
  };
};
var isString = exports.isString = is('string');
var isFunction = exports.isFunction = is('function');
var isObject = exports.isObject = is('object');

var flattenObject = exports.flattenObject = function flattenObject(obj) {
  var fullKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var fullAcc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Object.keys(obj).reduce(function (acc, key) {
    if (isObject(obj[key])) return flattenObject(obj[key], '' + fullKey + key + '.', acc);
    return _extends({}, acc, _defineProperty({}, fullKey + key, obj[key]));
  }, fullAcc);
};
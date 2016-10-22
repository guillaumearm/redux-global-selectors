'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _withSelectors = require('./withSelectors');

Object.keys(_withSelectors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _withSelectors[key];
    }
  });
});
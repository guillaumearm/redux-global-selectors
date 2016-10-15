export const is = type => x => typeof x === type;
export const isString = is('string');
export const isFunction = is('function');
export const isObject = is('object');

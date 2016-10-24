export const is = type => x => typeof x === type;
export const isString = is('string');
export const isFunction = is('function');
export const isObject = is('object');

export const flattenObject = (obj, fullKey = '', fullAcc = {}) => (
  Object.keys(obj).reduce((acc, key) => {
    if (isObject(obj[key]))
      return flattenObject(obj[key], `${fullKey}${key}.`, acc);
    return {
      ...acc,
      [fullKey + key]: obj[key],
    };
  }, fullAcc)
);

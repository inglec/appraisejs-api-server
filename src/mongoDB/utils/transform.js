const { mapValues, pickBy } = require('lodash/object');

// Recursively remove _id and other Mongo keys from a document object
const removeUnderscoreKeys = (object) => {
  // Base case
  if (typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(removeUnderscoreKeys);
  }

  const otherKeys = pickBy(object, (value, key) => !/^_/.exec(key));
  return mapValues(otherKeys, removeUnderscoreKeys);
};

module.exports = { removeUnderscoreKeys };

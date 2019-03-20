const { mapValues, pickBy } = require('lodash/object');

const keyTests = (tests, keyedBy, ...rest) => {
  const keyed = tests.reduce((acc, test) => {
    // Remove test key from object
    const trimmed = pickBy(test, (value, key) => key !== keyedBy);

    const testKey = test[keyedBy];
    if (Array.isArray(acc[testKey])) {
      acc[testKey].push(trimmed);
    } else {
      acc[testKey] = [trimmed];
    }

    return acc;
  }, {});

  return rest.length === 0 ? keyed : mapValues(keyed, value => keyTests(value, ...rest));
};

const transformTests = (tests) => {
  // Key tests by repository ID and then by commit ID inside each
  const testsByRepository = keyTests(tests, 'repositoryId', 'commitId');

  return testsByRepository;
};

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

module.exports = { removeUnderscoreKeys, transformTests };

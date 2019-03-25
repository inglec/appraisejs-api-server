const { map } = require('lodash/collection');
const { mapValues } = require('lodash/object');
const { default: createLogger } = require('logging');

const { TestModel } = require('./models');

const logger = createLogger('appraisejs:store');

const storeTest = ({ errors: testErrors, ...rest }) => {
  const transformed = mapValues(rest, (value, key) => (
    key === 'benchmarks'
      ? map(value, ({ errors: benchmarkErrors, definition, ...benchmarksRest }, benchmarkId) => ({
        ...benchmarksRest,
        benchmarkId,
        benchmarkDefinition: definition,
        errs: benchmarkErrors,
      }))
      : value
  ));

  const testDoc = TestModel({
    errs: testErrors.map(({ errors: stageErrors, stage }) => ({
      errs: stageErrors,
      stage,
    })),
    ...transformed,
  });

  return testDoc
    .save()
    .then(doc => logger.debug(JSON.stringify(doc, null, 2)));
};

module.exports = { storeTest };

const { default: createLogger } = require('logging');
const { pick } = require('lodash/object');

const { TestModel } = require('./models');

const logger = createLogger('appraisejs:store');

const storeTest = (test) => {
  const testDoc = TestModel({
    ...pick(test, [
      'benchmarks',
      'commitId',
      'endTime',
      'owner',
      'queuedAt',
      'repositoryId',
      'startTime',
      'testId',
      'workerId',
    ]),
    globalErrors: test.errors,
  });

  return testDoc
    .save()
    .then(doc => logger.debug(JSON.stringify(doc, null, 2)));
};

module.exports = { storeTest };

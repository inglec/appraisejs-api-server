const { default: createLogger } = require('logging');

const { removeUnderscoreKeys } = require('./utils/transform');
const { TestModel } = require('./models');

const logger = createLogger('appraisejs:query');

const queryRepository = async (repositoryId) => {
  const tests = await TestModel
    .find({ repositoryId })
    .lean()
    .then(removeUnderscoreKeys);

  logger.debug(tests);

  return tests;
};

module.exports = { queryRepository };

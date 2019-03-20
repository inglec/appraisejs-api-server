const { default: createLogger } = require('logging');

const { removeUnderscoreKeys, transformTests } = require('./utils/transform');
const { TestModel } = require('./models');

const logger = createLogger('appraisejs:query');

const queryRepository = async (repositoryId) => {
  const tests = await TestModel
    .find({ repositoryId })
    .lean();

  logger.debug(tests);

  // Prepare results for sending to client
  const transformed = transformTests(tests);
  return removeUnderscoreKeys(transformed);
};

module.exports = { queryRepository };

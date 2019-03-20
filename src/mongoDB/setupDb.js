const { default: createLogger } = require('logging');
const { connect } = require('mongoose');

const { MONGODB_PROD } = process.env;
if (!MONGODB_PROD) {
  throw Error('environment variable MONGODB_PROD not set');
}

const logger = createLogger('appraisejs:mongo');

const setupMongoDb = () => (
  connect(MONGODB_PROD).then(() => logger.info('connected to mongoDB on', MONGODB_PROD))
);

module.exports = { setupMongoDb };

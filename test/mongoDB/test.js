const { config: loadEnv } = require('dotenv');
const { default: createLogger } = require('logging');
const { connect, connection } = require('mongoose');

loadEnv();
const { MONGODB_TEST } = process.env;
if (!MONGODB_TEST) {
  throw Error('environment variable MONGODB_TEST not set');
}

const logger = createLogger('appraisejs:test');

const connectToDatabase = () => (
  connect(MONGODB_TEST).then(() => logger.info('connected to mongoDB on', MONGODB_TEST))
);

const dropDatabase = () => (
  connection.db.dropDatabase().then(() => logger.debug('dropped database at', MONGODB_TEST))
);

module.exports = { connectToDatabase, dropDatabase };

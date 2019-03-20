const { default: createLogger } = require('logging');

const { setupMongoDb } = require('./mongoDB/setupDb');
const app = require('./app');

const { PORT } = process.env;
if (!PORT) {
  throw Error('environment variable PORT not set');
}

function main() {
  const logger = createLogger('appraisejs');
  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    logger.info('server listening on port', PORT);
  });

  setupMongoDb().catch(error => logger.error(error));
}

main();

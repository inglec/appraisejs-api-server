const bodyParser = require('body-parser');
const express = require('express');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { pickBy } = require('lodash/object');
const { default: createLogger } = require('logging');

const { queryRepository } = require('./mongoDB/query');
const { storeTest } = require('./mongoDB/store');

const getNilValues = fields => Object.keys(pickBy(fields, value => !value));

const setupExpress = () => {
  const app = express();
  const logger = createLogger('appraisejs:app');

  app.use(bodyParser.json());
  app.use((req, res, next) => {
    const { body, method, originalUrl } = req;
    logger.debug(method, originalUrl, body);

    next();
  });

  app.get('/', (req, res) => res.send('test'));

  app.get('/repository', (req, res) => {
    const { repositoryId } = req.query;

    if (!repositoryId) {
      res.status(BAD_REQUEST).send('missing param repositoryId');
    } else {
      queryRepository(repositoryId)
        .then(doc => res.json(doc))
        .catch((error) => {
          logger.error(error);
          res.status(INTERNAL_SERVER_ERROR).end();
        });
    }
  });

  app.post('/submitTest', (req, res) => {
    const {
      benchmarks,
      commitId,
      endTime,
      errors,
      owner,
      queuedAt = -1, // TODO: Remove default value
      repositoryId,
      startTime,
      workerId,
    } = req.body;

    const invalid = getNilValues({
      benchmarks,
      commitId,
      endTime,
      errors,
      owner,
      queuedAt,
      repositoryId,
      startTime,
      workerId,
    });

    if (invalid.length > 0) {
      res.status(BAD_REQUEST).send(`missing fields ${invalid.join(',')}`);
    } else {
      storeTest(req.body)
        .then(() => res.end())
        .catch((error) => {
          res.status(BAD_REQUEST).end();
          logger.error(error);
        });
    }
  });

  return app;
};

function main() {
  const app = setupExpress();

  module.exports = app;
}

main();

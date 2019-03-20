const { default: createLogger } = require('logging');

const { storeTest } = require('../../src/mongoDB/store');
const { queryRepository } = require('../../src/mongoDB/query');

const { genTest } = require('./data/generate');
const { connectToDatabase, dropDatabase } = require('./test');

const logger = createLogger('appraisejs:test');

const repositoryId = 123456;

beforeAll(() => (
  connectToDatabase()
    .then(dropDatabase)
    .catch(error => logger.error(error))
));

describe('storeTest', () => {
  test('stores test', () => storeTest(genTest(repositoryId)));
  test('stores another test', () => storeTest(genTest(repositoryId)));
});

describe('queryRepository', () => {
  test('retrieves repository', () => queryRepository(repositoryId));
});

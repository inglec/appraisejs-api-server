const uuidv4 = require('uuid/v4');

// Dummy values
const directories = ['', 'components/', 'utils/'];
const filenames = ['index', 'test', 'random', 'helpers'];
const errors = [
  'a bad error',
  'a reallllly bad error',
  'cannot continue',
  'something bad happened',
  'uh oh',
];

// Functions
const uuidShort = () => uuidv4().substring(0, 8);
const randomNumber = (num1 = 1000000, num2) => {
  const randomInt = max => Math.floor(Math.random() * max);
  if (num2 === undefined) {
    return randomInt(num1);
  }
  return randomInt(num2) + num1;
};
const getRandomValue = array => array[randomNumber(array.length)];

// Generators
const genStageErrors = (amount) => {
  const stageErrors = [];
  for (let i = 0; i < amount; i += 1) {
    stageErrors.push({
      stage: uuidShort(),
      error: getRandomValue(errors),
    });
  }
  return stageErrors;
};

const genRuns = (amount) => {
  const getRun = () => ({
    result: randomNumber(100),
    time: randomNumber(),
  });

  const runs = [];
  for (let i = 0; i < amount - 1; i += 1) {
    runs.push(getRun());
  }
  runs.push(Math.random < 0.4 ? getRun() : { error: getRandomValue(errors) });
  return runs;
};

const genAttempts = (amount) => {
  const attempts = [];
  for (let i = 0; i < amount; i += 1) {
    attempts.push({ runs: genRuns(randomNumber(1, 5)) });
  }
  return attempts;
};

const getBenchmarks = (amount) => {
  const benchmarks = [];
  for (let i = 0; i < amount; i += 1) {
    const optional = Math.random() < 0.7
      ? {
        benchmarkDefinition: {
          runs: randomNumber(1, 10),
          maxAttempts: randomNumber(1, 3),
          timeout: randomNumber(1, 10) * 1000,
        },
        attempts: genAttempts(randomNumber(1, 3)),
      }
      : {
        error: {
          stage: uuidShort(),
          error: getRandomValue(errors),
        },
      };

    benchmarks.push({
      benchmarkId: uuidShort(),
      filepath: `src/${getRandomValue(directories)}${getRandomValue(filenames)}.benchmark.js`,
      lineNumber: randomNumber(1000),
      ...optional,
    });
  }
  return benchmarks;
};

const genTest = (repositoryId = randomNumber(), commitId = uuidv4()) => {
  const time = new Date().getTime();

  return {
    testId: uuidv4(),
    owner: uuidShort(),
    repositoryId,
    commitId,
    workerId: uuidShort(),
    queuedAt: time - 100000,
    startTime: time - 50000,
    endTime: time,
    globalErrors: genStageErrors(randomNumber(3)),
    benchmarks: getBenchmarks(randomNumber(1, 10)),
  };
};

module.exports = { genTest };

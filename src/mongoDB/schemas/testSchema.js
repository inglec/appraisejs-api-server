const { Mixed, Schema } = require('mongoose');

const error = {
  stage: { type: String, required: true },
  error: { type: String, required: true },
};

const attempt = {
  runs: {
    type: {
      result: Mixed,
      time: Number,
      error: String,
    },
    required: true,
  },
};

const benchmarkDefinition = {
  timeout: { type: Number, required: true },
  runs: { type: Number, required: true },
  maxAttempts: { type: Number, required: true },
};

const benchmark = {
  benchmarkId: { type: String, required: true, unique: true },
  filepath: { type: String, required: true },
  benchmarkDefinition: { type: benchmarkDefinition, required: false },
  lineNumber: { type: Number, required: true },
  attempts: {
    type: [attempt],
    required: true,
  },
  error: { type: error, required: false },
};

const testSchema = new Schema({
  testId: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  repositoryId: { type: Number, required: true },
  commitId: { type: String, required: true },
  workerId: { type: String, required: true },
  queuedAt: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  globalErrors: [error],
  benchmarks: [benchmark],
});

module.exports = testSchema;

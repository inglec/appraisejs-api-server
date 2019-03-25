const { Mixed, Schema } = require('mongoose');

const error = {
  stage: { type: String, required: true },
  errs: [{ type: String, required: true }],
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
  benchmarkId: { type: String, required: true },
  filepath: { type: String, required: true },
  benchmarkDefinition: { type: benchmarkDefinition, required: false },
  lineNumber: { type: Number, required: false }, // TODO: Make required
  attempts: {
    type: [attempt],
    required: true,
  },
  errs: [error],
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
  errs: [error],
  benchmarks: [benchmark],
});

module.exports = testSchema;

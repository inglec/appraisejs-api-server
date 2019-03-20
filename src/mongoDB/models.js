const { mapValues } = require('lodash');
const { model } = require('mongoose');

const testSchema = require('./schemas/testSchema');

const models = mapValues({ TestModel: testSchema }, (schema, modelName) => (
  model(modelName, schema)
));

module.exports = models;

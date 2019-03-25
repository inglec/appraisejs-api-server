const { model } = require('mongoose');

const testSchema = require('./schemas/testSchema');

module.exports = {
  TestModel: model('test', testSchema),
};

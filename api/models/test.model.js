const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ! SCHEMA HERE

const testSchema = new Schema({
  user_name: {
    type: String,
  },
});

const testAdd = mongoose.model('test', testSchema);

module.exports = testAdd;

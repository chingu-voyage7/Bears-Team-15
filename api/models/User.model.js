const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ! USER SCHEMA HERE

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name cannot be blank']
  },
  lastName: {
    type: String,
    required: [true, 'Last name cannot be blank']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be blank']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
  },
  age: {
    type: Number
  },
  image: {
    type: String
  },
  phone: {
    type: Number
  },
  address: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  eventsId: [{type: Schema.Types.ObjectId, ref: 'events'}]
  //   event: {
  //     type: String
  //   },
});

module.exports = User = mongoose.model('users', UserSchema);
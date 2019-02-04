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
  username:{
    type: String
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
    type: String,
    default: "https://res.cloudinary.com/duytlootx/image/upload/v1549145313/default-profile_xwm8on.svg"
  },
  avatar: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  attendedEvent: [{type: Schema.Types.ObjectId, ref: 'events'}],
  eventsId: [{type: Schema.Types.ObjectId, ref: 'events'}]
});

module.exports = User = mongoose.model('users', UserSchema);

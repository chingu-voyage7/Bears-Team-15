const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./main.model').user;

// ! EVENT SCHEMA HERE

const ItemSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    default: 0
  },
  owner: [User]
});

const EventSchema = new Schema({
  organizer: [User],
  title: {
    type: String,
    required: [true, 'Title cannot be blank']
  },
  date: {
    type: Date,
    // required: [true, 'Date cannot be blank']
    default: Date.now
  },
  image: {
    type: String
  },
  description: {
    type: String
    // required: [true, 'Description cannot be blank']
  },
  location: {
    type: String
    // required: [true, 'Address cannot be blank']
  },
  attendees:[{
     type: Schema.Types.ObjectId, ref: 'users' 
  }],
  supplies: [ItemSchema]
  
});

module.exports = Event = mongoose.model('events', EventSchema);
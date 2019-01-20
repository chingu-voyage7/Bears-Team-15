const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ! EVENT SCHEMA HERE
const addressSchema= new Schema({
  address: {type: String},
  city: {type: String},
  state: {type: String},
  zip: {type: Number},
  country:{type: String}
});
const ItemSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    fulfilled: {
        type: Number,
    },
    ownerId: [{type: Schema.Types.ObjectId, ref: 'users'}],
});

const EventSchema = new Schema({
  //   organizer: [User],
  organizer: {type: Schema.Types.ObjectId, ref: 'users'},
  title: {
    type: String,
    required: [true, 'Title cannot be blank']
  },
  date:{
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
  location: addressSchema 
  // required: [true, 'Address cannot be blank']
 ,
  attendees: [{type: Schema.Types.ObjectId, ref: 'users'}],
  supplies: [ItemSchema]
});

module.exports = Event = mongoose.model('events', EventSchema);

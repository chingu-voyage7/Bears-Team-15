const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ! EVENT SCHEMA HERE
const addressSchema = new Schema({
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: Number},
    country: {type: String},
});
const supplySchema= new Schema({
    name: String,
    description: String,
    quantity: Number,
    fulfilled: {type: Number, default:0},
    volunteers: [{volunteer:{type: Schema.Types.ObjectId, ref: 'users'},quantity: {type: Number, default: 0}}]
    
});

const EventSchema = new Schema({
    //   organizer: [User],
    organizer: {type: Schema.Types.ObjectId, ref: 'users'},
    orginization: {type: String},
    title: {
        type: String,
        required: [true, 'Title cannot be blank'],
    },
    date: {
        type: Date,
        // required: [true, 'Date cannot be blank']
        // default: Date.now,
    },
    dateCreated:{
        type: Date,
        default: new Date().now

    },
    image: {
        type: String,
    },
    description: {
        type: String,
        // required: [true, 'Description cannot be blank']
    },
    location: addressSchema,
    // required: [true, 'Address cannot be blank']
    category: {
        type: String,
    },
    attendees: [{type: Schema.Types.ObjectId, ref: 'users'}],
    supplies: [supplySchema],
});

module.exports = Event = mongoose.model('events', EventSchema);

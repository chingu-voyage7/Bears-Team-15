const Event = require('../models/main.model').event;

// !! This will change OBJECT TYPE TO STRING
const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

module.exports = {
  getAllEvents: async (data) => {
    return await Event.find().populate('attendees organizer');
  },
  // TODO: Fix item here. ask ujwal
  addEvent: async (data) => {
    const newEvent = new Event({
      organizer: data.organizer,
      title: data.title,
      date: new Date(),
      image: data.image,
      description: data.description,
      location: data.location,
      attendees: data.attendees,
      supplies: data.supplies
    });

    console.log(newEvent, 'newEvent');
    return await newEvent.save();
  },
  getEventWithEventId: async (data) => {
    return await Event.findOne({_id: data.event});
  }
};
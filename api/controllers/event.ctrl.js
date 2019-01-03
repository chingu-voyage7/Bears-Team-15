const Event = require('../models/main.model').event;

// !! This will change OBJECT TYPE TO STRING
const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

module.exports = {
  getAllEvents: async (data) => {
    return await Event.find();
  },
  // TODO: Fix item here. ask ujwal
  addEvent: async (data) => {
    const newEvent = new Event({
      organizerId: data.organizerId,
      title: data.title,
      date: new Date(),
      image: data.image,
      description: data.description,
      location: data.location,
      attendeesId: data.attendeesId,
      supplies: data.supplies
    });

    console.log(newEvent, 'newEvent');
    return await newEvent.save();
  },
  getEventWithUserId: async (data) => {
    return await Event.findOne({_id: data.event});
  }
};
const Event = require('../models/main.model').event;
const User = require('../models/main.model').user;

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
    // 
    addEvent: async (data) => {

        console.log("data from ADDevent",data);
        const newEvent = new Event({
            organizer: data.organizer,
            title: data.title,
            date: new Date(),
            image: data.image,
            description: data.description,
            location: data.location,
            attendees: data.attendees,
            supplies: data.supplies,
        });

        console.log(newEvent, 'newEvent');
        return await newEvent.save();
    },
    getEventById: async (data) => {
        console.log(data);
        return await Event.findOne({_id: data.id}).populate('attendees organizer');
    },
    filteredEventWith: async (data) => {
        return await Event.find({
            title: {$regex: '.*' + data.char + '.*', $options: 'i'},
        }).populate('attendees organizer');
    },
};

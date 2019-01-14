const Event = require('../models/main.model').event;
const User = require('../models/main.model').user;

// !! This will change OBJECT TYPE TO STRING
const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.prototype.valueOf = function() {
    return this.toString();
};

module.exports = {
    getAllEvents: async (data) => {
        try {
            return await Event.find().populate('attendees organizer');
        } catch (error) {
            return error;
        }
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
            supplies: data.supplies,
        });

        console.log(newEvent, 'newEvent');
        return await newEvent.save();
    },
    getEventWithEventId: async (data) => {
        return await Event.findOne({_id: data.event});
    },
    filteredEventWith: async (data) => {
        try {
            const events = await Event.find({
                title: {$regex: '.*' + data.char + '.*', $options: 'i'},
            }).populate('attendees organizer');

            // const users = await User.find({
            //     firstName: {$regex: '.*' + data.char + '.*', $options: 'i'},
            // }).populate('eventsId');

            return [...events];
        } catch (error) {
            return [
                {
                    isEventError: true,
                    message: error,
                    error,
                    statusCode: 400,
                },
            ];
        }
    },
};

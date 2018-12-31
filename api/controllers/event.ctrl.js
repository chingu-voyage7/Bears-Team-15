const Event = require('../models/main.model').event;

module.exports = {
    getAllEvents: async (data) => {
        return await Event.find();
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
            // items: [data.items],
        });
        return await newEvent.save();
    },
    getEventWithUserId: async (data) => {
        return await Event.findOne({_id: data.event});
    },
};

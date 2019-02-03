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

    // TODO: when adding a new event put the event ID to a user
    addEvent: async (data) => {
        try {
            const user = await User.findById(data.organizer);
            const newEvent = new Event(data);
            const event = await newEvent.save();

            user.eventsId.push(event._id);
            user.save();
            return event;
        } catch (error) {
            return error;
        }
    },
    getEventById: async (data) => {
        console.log(data);
        return await Event.findOne({_id: data.id}).populate(
            'attendees organizer supplies.volunteers.volunteer'
        );
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
            return error;
        }
    },
    deleteEvent: async (data) => {
        try {
            const user = await User.findById(data.userId);
            await user.eventsId.remove(data.eventId);
            await Event.deleteOne({_id: data.eventId});
            return await user.save();
        } catch (error) {
            return error;
        }
    },
    updateEvent: async (data) => {
        const {title, organization, description, location, date} = data;
// modify the data to be dynamic based on data set.... still will throw error.
    Console.log(data);
        try {
            const event = await Event.findById(data.id);
            event.location.address = location.address;
            event.location.city = location.city;
            event.location.state = location.state;
            event.location.zip = location.zip;
            event.set({
                title,
                organization,
                description,
            });
            event.save();
        } catch (error) {
            return error;
        }
    },
};

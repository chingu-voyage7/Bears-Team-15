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
            // console.log(test);
        } catch (error) {
            return error;
        }
    },

    addEvent: async (data) => {
        console.log(data);
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
        console.log(data);
        try {
            // deleting the event by the owner
            const user = await User.findById(data.userId);
            await user.eventsId.remove(data.eventId);

            // const event = await Event.findById(data.eventId);
            // const attendingUsers = await event.attendees;

            // console.log(attendingUsers, 'array');

            // User.find({_id: {$in: attendingUsers}}, (err, response) => {
            //     console.log(response);
            //     response.attendedEvent.id(data.eventId).remove();
            //     console.log(response);
            // });

            Event.findById(data.eventId, function(err, event) {
                return event.remove(function(err) {
                    if (!err) {
                        User.updateMany(
                            {_id: {$in: event.attendees}},
                            {$pull: {attendedEvent: data.eventId}},
                            function(err, numberAffected) {
                                console.log(numberAffected);
                            }
                        );
                    } else {
                        console.log(err);
                    }
                });
            });

            // await Event.remove({_id: {$in: attendingUsers}}, function(
            //     err,
            //     response
            // ) {
            //     console.log(response);
            // });

            // await Event.deleteOne({_id: data.eventId});
            return await user.save();
        } catch (error) {
            return error;
        }
    },
    updateEvent: async (data) => {

        const {organizer,eventId,...myUpdate}= data;
        console.log(organizer,eventId,myUpdate);
        return await Event.findByIdAndUpdate(eventId,myUpdate);


        // const {title, organization, description, location, date} = data;
        // // modify the data to be dynamic based on data set.... still will throw error.
        // console.log(data);
        // try {
        //     const event = await Event.findById(data.id);
        //     event.location.address = location.address;
        //     event.location.city = location.city;
        //     event.location.state = location.state;
        //     event.location.zip = location.zip;
        //     event.set({
        //         title,
        //         organization,
        //         description,
        //     });
        //     event.save();
        // } catch (error) {
        //     return error;
        // }
    },
    /**
     * this method will add a attending user to the event
     * @param {OBJECT} data
     * @return {OBJECT} user
     */
    attendEvent: async (data) => {
        const {eventId, attendeeId} = data;

        try {
            const event = await Event.findById(eventId);
            event.attendees.push(attendeeId);
            event.save();

            const user = await User.findById(attendeeId).populate(
                'attendedEvent'
            );
            user.attendedEvent.push(eventId);
            user.save();

            return user;
        } catch (error) {
            return error;
        }
    },

    /**
     * this method will remove the attended event
     * @param {OBJECT} data
     * @return {OBJECT} user
     */
    unAttendEvent: async (data) => {
        const {eventId, currentUserId} = data;
        try {
            // removes the user from the event attended property
            const event = await Event.findById(eventId);
            event.attendees.removed(currentUserId);
            event.save();

            // removes the event from the user attendedEvent property
            const user = await User.findById(currentUserId).populate(
                'attendedEvent'
            );
            user.attendedEvent.remove(eventId);
            user.save();

            return user;
        } catch (error) {
            return error;
        }
    },
};

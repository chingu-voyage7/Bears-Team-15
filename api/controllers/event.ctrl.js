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
    // 
    addEvent: async (data) => {

        console.log("data from ADDevent",data);
        const newEvent = new Event(
            data
                // organizer: data.organizer,
                // title: data.title,
                // date: new Date(),
                // image: data.image,
                // description: data.description,
                // location: data.location,
                // attendees: data.attendees,
                // supplies: data.supplies,
            );

        console.log(newEvent, 'newEvent');
        newEvent.save(function(err,data){
            User.findById(data.organizer,function(err,user){
                user.eventsId.push(newEvent);
             return await user.save();
        });
    })},
    getEventById: async (data) => {
        console.log(data);
        return await Event.findOne({_id: data.id}).populate('attendees organizer');
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
};

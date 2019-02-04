const Event = require('../models/main.model').event;
const User = require('../models/main.model').user;
module.exports = {
    addSupply: async (data) => {
        const { eventId, ...supply } = data;
        let checkSub
        console.log(data);
        await Event.findById(eventId, function (err, event) {
            event.supplies.push(supply);
            checkSub = event.supplies[event.supplies.length - 1];
            console.log(checkSub);
            event.save();
        });
        return checkSub;
    },
    volunteerSupply: async (data) => {
        const { id, supplyId, volunteerId, quantity } = data;
        let checkSub;
        await Event.findById(id, function (err, event) {
            event.supplies.id(supplyId).volunteers.push({ volunteer: volunteerId, quantity: quantity });
            checkSub = event.supplies.id(supplyId);
           // add supply to the user as well so they can see all the supplies for each event they are attending.
           // error checking in the backend or frontend for duplicates
            console.log(checkSub);
            event.save();
        });
        return checkSub;

    },
    unvolunteerSupply: async (data) => {
        const { id, supplyId, donationId} = data;
        let checkSub;
        await Event.findById(id, function (err, event) {
            checkSub = event.supplies.id(supplyId);
            event.supplies.id(supplyId).volunteers.id(donationId).remove();
            console.log(checkSub);
            event.save();
        });
        return checkSub;

    },
    deleteSupply: async (data) => {
        const { id, supplyId } = data;
        let checkSub;
        await Event.findById(id, function (err, event) {
            checkSub = event.supplies.id(supplyId);
            event.supplies.id(supplyId).remove();

            event.save();
        });
        return checkSub;
    },
    updateSupply: async (data) => {
        const { id, supplyId, ...myUpdate } = data;
        let checkSub;
        await Event.findById(id, function (err, event) {
            event.supplies.id(supplyId).set(myUpdate);
            checkSub = event.supplies.id(supplyId);
            event.save();
        });
        return checkSub;
    }



};

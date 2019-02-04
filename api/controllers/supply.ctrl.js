const mongoose = require('mongoose');
const {event} = require('../models/main.model');

module.exports = {
    addSupply: async (data) => {
        try {
            const savedEvent = await event.findById({_id: data.eventId});
            const newSupply = await {
                _id: mongoose.Types.ObjectId(),
                name: data.name,
                description: data.description,
                quantity: data.quantity,
                fulfilled: data.fulfilled,
                ownerId: data.ownerId,
            };

            await savedEvent.supplies.push(newSupply);
            await savedEvent.save();
            const supply = await savedEvent.supplies.id(newSupply._id);
            supply.ownerId.push(newSupply.ownerId);
        } catch (error) {
            return error;
        }
    },
    deleteSupply: async (data) => {
        const newSupply = {
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            OwnerId: data.ownerId,
        };

        const savedEvent = await event.findById({_id: data.eventId});

        await savedEvent.supplies.id(newSupply);
        savedEvent.save();

        // return await newSupply.save();
    },

    getAllSupply: async (data) => {
        return await supply.find().populate('ownerId');
    },
};

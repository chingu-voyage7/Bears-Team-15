const {event} = require('../models/main.model');

module.exports = {
    addSupply: async (data) => {
        const newSupply = {
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            OwnerId: data.ownerId,
        };

        const savedEvent = await event.findById({_id: data.eventId});

        await savedEvent.supplies.push(newSupply);
        savedEvent.save();
        console.log(savedEvent);

        // return await newSupply.save();
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
        console.log(savedEvent);

        // return await newSupply.save();
    },

    getAllSupply: async (data) => {
        return await supply.find().populate('ownerId');
    },
};

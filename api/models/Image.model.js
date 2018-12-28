const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ! IMAGE SCHEMA HERE

const ImageSchema = new Schema({
  url: {
    type: String
  },
  description: {
    type: String
  },
  userId: ObjectId,
  eventId: ObjectId
});

module.exports = Image = mongoose.model('images', ImageSchema);
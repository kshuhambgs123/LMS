const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ISBN: { type: String, unique: true },
  title: String,
  author: String,
  subject: String,
  copies: [
    {
      copyId: String,
      status: {
        type: String,
        enum: ['Available', 'Issued', 'Reserved'],
        default: 'Available',
      },
    },
  ],
});

module.exports = mongoose.model('Book', bookSchema);

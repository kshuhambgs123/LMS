const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  recordId: { type: String, unique: true },
  userId: String,
  ISBN: String,
  issueDate: Date,
  returnDate: Date,
});

module.exports = mongoose.model('Record', recordSchema);

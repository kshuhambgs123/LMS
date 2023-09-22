const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, unique: true },
  userId: String,
  amount: Number,
  paymentDate: Date,
});

module.exports = mongoose.model('Payment', paymentSchema);

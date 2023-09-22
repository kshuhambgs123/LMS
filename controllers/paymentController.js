// paymentController.js
const Payment = require('../models/payment');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data provided' });
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data provided' });
  }
};

// Delete a payment by ID (soft delete)
const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndRemove(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(deletedPayment);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a payment by ID (permanent delete)
const removePayment = async (req, res) => {
  try {
    const removedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!removedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(removedPayment);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllPayments,
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  removePayment,
};

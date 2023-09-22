// recordController.js
const Record = require('../models/record');

// Get all records
const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new record
const createRecord = async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data provided' });
  }
};

// Get a record by ID
const getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a record by ID
const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data provided' });
  }
};

// Delete a record by ID (soft delete)
const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndRemove(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(deletedRecord);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a record by ID (permanent delete)
const removeRecord = async (req, res) => {
  try {
    const removedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!removedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(removedRecord);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllRecords,
  createRecord,
  getRecordById,
  updateRecord,
  deleteRecord,
  removeRecord,
};

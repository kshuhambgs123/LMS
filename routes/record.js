const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// Define routes for CRUD operations on records
router.get('/', recordController.getAllRecords);
router.get('/:id', recordController.getRecordById);
router.post('/', recordController.createRecord);
router.put('/:id', recordController.updateRecord);
router.delete('/:id', recordController.deleteRecord);
router.delete('/:id', recordController.removeRecord);

module.exports = router;

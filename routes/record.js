// RecordRoutes.js
const express = require('express');
const router = express.Router();
const { Record } = require('../models/record');
const recordCont = require('../controllers/records');

router.get('/', recordCont.getAllRecords);
router.get('/:id', recordCont.getRecordById);
router.post('/', recordCont.createRecord);
router.put('/:id', recordCont.updateRecordById);
router.delete('/:id', recordCont.deleteRecordById);

module.exports = router;

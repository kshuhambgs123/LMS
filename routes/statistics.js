const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Define a route to get library statistics based on a specified time span
router.get('/library/:timespan', statsController.getLibraryStatistics);

module.exports = router;

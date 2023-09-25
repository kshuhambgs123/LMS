const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Define a route to get library statistics based on a specified time span
router.get('/library/:timespan', statsController.getLibraryStatistics);
router.get('/most-active-user', statsController.getMostActiveUser);
router.get('/total-user', statsController.getTotalUser);
router.get('/highest-lent-book', statsController.getHighestLentBook);
router.get('/oldest-book', statsController.getOldestBook);
router.get('/latest-book', statsController.getNewestBook);
router.get('/most-available-book', statsController.getMostAvailableBook);
router.get('/total-book',statsController.getTotalBook)

module.exports = router;

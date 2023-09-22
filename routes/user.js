// usersRoutes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Fetch a list of all users with optional parameters for sort, search, and filter
router.get('/', usersController.getAllUsers);

// Fetch a user by ID
router.get('/:id', usersController.getUserById);

// Delete a user by ID
router.delete('/:id', usersController.deleteUser);

// Insert a new user and get the inserted item in return
router.post('/', usersController.createUser);

// Update a user by ID
router.put('/:id', usersController.updateUser);

module.exports = router;

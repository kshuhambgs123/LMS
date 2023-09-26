// usersRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const userCont = require('../controllers/users');

// Fetch a list of all users with optional parameters for sort, search, and filter
router.get('/', userCont.getAllUsers);

// Fetch a user by ID
router.get('/:id', userCont.getUserById);

// Insert a new user and get the inserted item in return
router.post('/', userCont.createUser);

// Update a user by ID
router.put('/:id', userCont.updateUserById);

// Delete a user by ID
router.delete('/:id', userCont.deleteUserById);

module.exports = router;

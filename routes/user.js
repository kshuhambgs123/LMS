// usersRoutes.js 
const express = require('express');
const router = express.Router();
const userCont = require('../controllers/users');

// Fetch a list of all users with optional parameters for sort, search, and filter
router.get('/', userCont.getAllUsers);

//Search a user by name
router.get("/search", userCont.searchUser);

//filter by category
router.get("/filter", userCont.filterUser);

//sort 
router.get("/sort", userCont.sortUser);

// Fetch a user by ID
router.get('/:id', userCont.getUserById);


// Insert a new user and get the inserted item in return
router.post('/', userCont.createUser);

// Update a user by ID
router.put('/:id', userCont.updateUserById);

// Delete a user by ID
router.delete('/:id', userCont.deleteUserById);

module.exports = router;

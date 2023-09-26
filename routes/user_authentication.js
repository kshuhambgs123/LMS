// usersAuthenticationRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { User } = require('../models/user_authentication');
const userCredCont = require('../controllers/userController');
const userAuth = require('../middleware/userAuth');
const { signup, login, logout } = userCredCont;

// Insert a new user and get the inserted item in return
router.post('/signup', userAuth.saveUser, signup);
router.post('/login', login );
router.post('/logout', authenticate.authenticateToken, logout);

module.exports = router;

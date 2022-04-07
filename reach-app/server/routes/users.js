const express = require('express');
const {registerUser, authUser} = require('../controllers/user-controllers');
const {protect} = require('../middleware/middleware')
const users = express.Router();

// set up path, call the request, then pass in the request function
users.route('/')
    .post(registerUser)
    
users.post('/login', authUser)

module.exports = users;
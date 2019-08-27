const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

// Create router instance
const router = express.Router();

// User authentication
const authenticateUser = async (req, res, next) => {
}

// GET Users
router.get('/users', authenticateUser, (req, res) => {
    const user = req.currentUser;

    console.log(user);
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
    })
})

module.exports = router;
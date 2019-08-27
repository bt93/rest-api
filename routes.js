const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

// Create router instance
const router = express.Router();

// User authentication
const authenticateUser = async (req, res, next) => {
    let message = null;
    const credentials = auth(req);

    // Checks if email and password are given in the request
    if (credentials.name && credentials.pass) {
        // If not null: user looked for in database
        const user = await User.findOne({
            where: {
                emailAddress: credentials.name
            }
        });

        // Checks if user is in database
        if (user) {
            // If user not null: checks with encrypted password
            const authenticated = bcryptjs
                .compareSync(credentials.pass, user.dataValues.password);
            
            // Checks if password matches what's on database
            if (authenticated) {
                // If true: returns as current user
                req.currentUser = user.dataValues;
            } else {
                // If false: returns Authentication failure message 
                message = `Authentication failure for ${user.dataValues.emailAddress}`;
            }
        } else {
            // If user null: returns 'not found' message
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        // If email nor password given: give 'not found' message
        message = 'Auth header not found. Must give email address and password.';
    }

    // Checks for error messages
    if (message) {
        // Returns 401 and error message
        console.warn(message);

        res.status(401).json({ auth: false, message: message });
    } else {
        // Moves on to get request
        next();
    }
}

// GET authorized user
router.get('/users', authenticateUser, (req, res) => {
    const user = req.currentUser;

    
    res.json({
        auth: true,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    })
})

module.exports = router;
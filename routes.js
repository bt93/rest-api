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
            },
            attributes: ['password']
        });

        // Checks if user is in database
        if (user) {
            // If user not null: checks with encrypted password
            const authenticated = bcryptjs
                .compareSync(credentials.pass, user.dataValues.password);
            
            // Checks if password matches what's on database
            if (authenticated) {
                // If true: returns as current user
                req.currentUser = await User.findOne({
                    where: {
                        emailAddress: credentials.name
                    },
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                })
            } else {
                // If false: returns Authentication failure message 
                message = `Authentication failure for ${credentials.name}`;
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

        res.status(401).json({ message: message });
    } else {
        // Moves on to get request
        next();
    }
}

// GET authorized user
router.get('/users', authenticateUser, (req, res) => {
    const user = req.currentUser;
    

    res.json({ user })
});

// GET all courses
router.get('/courses', async (req, res) => {
    try {
        // Finds a lists all courses on database
        const courses = await Course.findAll({
            include: [{
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            }],
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        })

        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({errors: err});
    }
});

// GET one course by :id
router.get('/courses/:id', async (req, res) => {
    const courseId = parseInt(req.params.id);

    // Check if param is number
    if (Number.isInteger(courseId)) {
        // If true: query database w/ connected user
        const course = await Course.findOne({
            where: {
                id: courseId
            },
            include: [{
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            }],
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        });
        
        // Check if course not null
        if (course) {
            // If not null: respond with course
            res.status(200).json({ course });
        } else {
            // If null: respond with 404
            res.status(404).json({ message: 'Course does not exsist.' });
        }
    } else {
        // If false: responds with 400
        res.status(400).json({ message: 'Course id must be a number.' });
    }
});

// POST new user
router.post('/users', async (req, res) => {
    try {
        // Get user from request body
        const user = req.body;

        // Hash the password
        user.password = bcryptjs.hashSync(user.password);

        // Adds new user to database
        await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            password: user.password
        });

        // Sets status to 201 and ends request
        res.status(201).location('/').end();
    } catch (err) {
        // Sets status to 400 and gives error 
        res.status(400).json({ errors: err });
    }
});

router.post('/courses', authenticateUser, async (req, res) => {
    try {
        const user = req.currentUser;
        const newCourse = req.body;

        await Course.create({
            title: newCourse.title,
            description: newCourse.description,
            estimatedTime: newCourse.estimatedTime,
            materialsNeeded: newCourse.materialsNeeded,
            userId: user.id
        });
        
        res.status(201).location('/').end();
    } catch (err) {
        res.status(400).json({ errors: err });
    }
});

module.exports = router;
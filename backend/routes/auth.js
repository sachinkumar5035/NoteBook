const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); // for express validator
const bcrypt = require('bcryptjs'); // for encryption and decrption of password to install -> npm install bcryptjs
const jwt = require('jsonwebtoken'); // to use jsonwebtoken to install -> npm install jsonwebtoken
const fetchuser = require('../middleware/fetchuser'); // to use middleware fetchuser 
const JWT_SECRET = 'Iamagood$an'; // should be in .env.local file 




//route 1 : create a user using post '/api/auth/createuser' lo login required
router.post('/createuser', [// express validators
    // email must be an email
    body('email', 'enter a valid email').isEmail(),
    // name must be at least 5 chars long
    body('name', 'name must be 5 character long').isLength({ min: 5 }),
    // password must be at least 5 chars long
    body('password', 'password must be atleat 5 charater long').isLength({ min: 5 }),
], async (req, res) => {

    let success = false; // by this variable we will check if API giving correct output or not

    // check whether user with the same email exist or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({success, error: "sorry user with the same email has already present" });
        }

        // password encryption 
        // need to use await bcs it will return a promise which takes time to return  
        const salt = await bcrypt.genSalt(10); // generating salt for the password
        const hashCode = await bcrypt.hash(req.body.password, salt); // generating hash and appending salt in password to make it more secure

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashCode, // setting password as generated hashCode which is hashCode form(encrypted form)
        });
        // sending ID in authtoken
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        // generate authtoken to varify 
        const authtoken = jwt.sign(data, JWT_SECRET);
        // res.json(user)
        res.json({ success, authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({success, error: "some error occured" });
    }
})



// route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [// express validators
    // email must be an email
    body('email', 'enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'password can not be blank').exists(),
], async (req, res) => {
    let success = false;
    // check whether user with the same email exist or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body; // getting email and password from body which is entered by user 

    try {
        let user = await User.findOne({ email }); // use await for async function
        if (!user) {
            return res.status(400).json({success, error: "login with correct credential" });
        }
        // use await for async function
        const compPassword = await bcrypt.compare(password, user.password);// user.password id the password which is stored in the database and password is the password which is entered by the user 
        if (!compPassword) {
            return res.status(400).json({success, error: "login with correct credential" });
        }

        // sending the id of that particular user 
        const data = {
            user: {
                id: user.id
            }
        }
        success=true;
        // generate authtoken to varify 
        const authtoken = jwt.sign(data, JWT_SECRET);
        // sending the authtoken after verification
        res.json({success, authtoken })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({success, error: "Internal server error" });
    }
})

// Router 3: Authenticate a User using: POST "/api/auth/getuser"    Login required
router.post('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try {
        let userId = req.user.id; // getting id send from data.user 
        const user = await User.findById(userId).select('-password'); // fetching user details except password 
        res.send(user); // sending user data 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success, error: "Internal server error" });
    }
})

module.exports = router;
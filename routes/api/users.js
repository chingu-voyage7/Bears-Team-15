const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const keys = require("../../config/keys");

// Registration route
router.post("/register", (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check email is not already registered
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                // Throu a 400 error if email already exists
                errors.email = "An account is already registered with this email address";
                return res.status(400).json(errors);
            } else {
                // Else create a new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                // Salt and hash password and save new User to database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = {
                                    id: user.id,
                                    name: user.name
                                };

                                jwt.sign(payload, keys.secretOrKey, {
                                    expiresIn: 43200
                                }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// Login route
router.post("/login", (req, res) => {

    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
            email
        })
        .then(user => {
            // Invalid email
            if (!user) {
                errors.email = "This email is not registered. Please check your email and try again";
                return res.status(400).json(errors);
            }
            // Valid email
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name
                        };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell key to expire in 12 hours
                            {
                                expiresIn: 43200
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        errors.password = "Please check your password and try again";
                        return res.status(400).json(errors);
                    }
                });
        });
});

// Test route
router.get("/test", (req, res) => res.json({
    msg: "This is the users route"
}));

module.exports = router;
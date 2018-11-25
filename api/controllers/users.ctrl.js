const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/main.model").user;
const Test = require("../models/main.model").test;
// validators
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");
// import secret
const dotenv = require("dotenv").config();
const secretOrKey = process.env.SECRET_OR_KEY;

module.exports = {
  helloWorld: (req, res) => {
    User.find().then(users => res.json(users));
  },

  // tests: (req, res) => {
  //   Test.find().then(tests => res.json(tests));
  // },

  registerUser: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        // Throw a 400 error if the email address already exists
        errors.email = "An account with this email already exists";
        return res.status(400).json(errors);
      } else {
        // Otherwise create a new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        // Hash and salt password
        bcrypt.genSalt(11, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {
                  id: user.id,
                  email: user.email
                };
                // assign web token using jsonwebtoken
                jwt.sign(
                  payload,
                  secretOrKey,
                  // Set seesion expiration to 2 days
                  { expiresIn: "2 days" },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  },

  loginUser: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email =
          "An account with this email does not exist. Please check your email and try again";
        return res.status(400).json(errors);
      }
      // Password validation with BCrypt
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, email: user.email };
          // assign web token using jsonwebtoken
          jwt.sign(
            payload,
            secretOrKey,
            // Set seesion expiration to 2 days
            { expiresIn: "2 days" },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({
            password: "Please check your password and try again"
          });
        }
      });
    });
  }
};

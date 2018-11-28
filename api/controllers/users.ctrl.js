const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/main.model').user;
const Test = require('../models/main.model').test;
// validators
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');
// import secret
const dotenv = require('dotenv').config();
const secretOrKey = process.env.SECRET_OR_KEY;

module.exports = {
 // Fetches all users from db
 getUsers: (req, res) => {
  return User.find().then((users) => users);
 },

 // tests: (req, res) => {
 //   Test.find().then(tests => res.json(tests));
 // },

 // Sign up a new user
 registerUser: (req, res) => {
  // const {errors, isValid} = validateRegisterInput(req.body);
  // if (!isValid) {
  //  return res.status(400).json(errors);
  // }
  // Check to make sure nobody has already registered with a duplicate email
  return User.findOne({email: req.email}).then((user) => {
   if (user) {
    // Throw a 400 error if the email address already exists
    // errors.email = 'An account with this email already exists';
    // return res.status(400).json(errors);
    return 'An account with this email already exists';
   } else {
    // Otherwise create a new user

    // Hash and salt password
    return new Promise((res, rej) => {
     bcrypt.genSalt(11, (err, salt) => {
      returnedUser = new Promise((res, rej) => {
       const newUser = new User({
        name: req.name,
        email: req.email,
        password: req.password
       });
       bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        const getNewUser = newUser
         .save()
         .then((user) => {
          const payload = {
           id: user.id,
           name: user.name
          };

          return new Promise((res, rej) => {
           // assign web token using jsonwebtoken
           jwt.sign(
            payload,
            secretOrKey,
            // Set seesion expiration to 2 days
            {expiresIn: '2 days'},
            (err, token) => {
             //  res.json({
             //   success: true,
             //   token: 'Bearer ' + token
             //  });
             res({token: 'Bearer ' + token});
            }
           );
          });
         })
         .catch((err) => {
          rej({error: 'Internal Error'});
         });
        res(getNewUser);
       });
      });
      res(returnedUser);
     });
    });
   }
  });
 },

 // Login existing user
 // FIXME: req, res fix this. rename this.
 loginUser: (req, res) => {
  // since were not invoking this function via frontend or post man. req and res doesn't have express obj
  // rather it has arguments pass from grapql. req will contain an email and password prop
  // we will access this by req.email and req.password. we will also change req to avoid confusion

  // const {errors, isValid} = validateLoginInput(req.body);

  // if (!isValid) {
  //  return res.status(400).json(errors);
  // }

  // ill comment this one out to test graph
  // const email = req.body.email;
  // const password = req.body.password;
  const email = req.email;
  const password = req.password;
  console.log(email, password);

  return User.findOne({email}).then(async (user) => {
   if (!user) {
    errors.email =
     'An account with this email does not exist. Please check your email and try again';
    // return res.status(400).json(errors);
    return 'error';
   }
   // Password validation with BCrypt
   return bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
     const payload = {
      id: user.id,
      name: user.name
     };

     // assign web token using jsonwebtoken
     return new Promise((res, rej) => {
      jwt.sign(
       payload,
       secretOrKey,
       // Set seesion expiration to 2 days
       {expiresIn: '2 days'},
       (err, token) => {
        //  res.json({
        //   success: true,
        //   token: 'Bearer ' + token,
        //  });
        res({success: true, token: 'Bearer ' + token});
       }
      );
     });
    } else {
     rej({token: 'Please check your password and try again'});
     //  return res.status(400).json({
     //   password: 'Please check your password and try again'
     //  });
    }
   });
  });
 },

 // Fetch current user
 getCurrentUser: (req, res) => {
  res.json({
   id: req.user.id,
   name: req.user.name,
   email: req.user.email
  });
 }
 //   passport.authenticate('jsonwebtoken', {session: false}), (req, res) => {
 //   res.json({
 //     id: req.user.id,
 //     name: req.user.name,
 //     email: req.user.email
 //   });
 // }
};

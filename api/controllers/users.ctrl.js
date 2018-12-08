const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/main.model').user;

// validators
// const validateRegisterInput = require('./validation/register');
// const validateLoginInput = require('./validation/login');

// import secret
require('dotenv').config();
const secretOrKey = process.env.SECRET_OR_KEY;

module.exports = {
 // FIXME: req, res should be change. ask permission first
 // Fetches all users from db
 getUsers: async (req, res) => {
  return await User.find();
 },

 // tests: (req, res) => {
 //   Test.find().then(tests => res.json(tests));
 // },

 // FIXME: req, res should be change. ask permission first
 // Sign up a new user
 registerUser: async (req, res) => {
  // const {errors, isValid} = validateRegisterInput(req.body);
  // if (!isValid) {
  //  return res.status(400).json(errors);
  // }
  // Check to make sure nobody has already registered with a duplicate email
  const user = await User.findOne({email: req.email});

  // Throw a 400 error if the email address already exists
  // errors.email = 'An account with this email already exists';
  if (user) {
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
        .then((userOne) => {
         const payload = {
          id: userOne.id,
          name: userOne.name
         };
         return new Promise((res, rej) => {
          // assign web token using jsonwebtoken
          jwt.sign(
           payload,
           secretOrKey,
           // Set seesion expiration to 2 days
           {expiresIn: '2 days'},
           (err, token) => {
            // removed json response
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
 },

 // FIXME: req, res should be change. ask permission first
 loginUser: async (req, res) => {
  // const {errors, isValid} = validateLoginInput(req.body);

  // if (!isValid) {
  //  return res.status(400).json(errors);
  // }

  // ill comment this one out to test graph
  // const email = req.body.email;
  // const password = req.body.password;
  const email = req.email;
  const password = req.password;

  const user = await User.findOne({email});
  if (!user) {
   errors.email = `An account with this email does not exist. 
    Please check your email and try again`;
   // removed json response
   return 'error';
  }
  const isMatch = await bcrypt.compare(password, user.password);
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
     // Set session expiration to 2 days
     {expiresIn: '2 days'},
     (err, token) => {
      // removed json response
      res({success: true, token: 'Bearer ' + token});
     }
    );
   });
  } else {
   // removed json response
   rej({token: 'Please check your password and try again'});
  }
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

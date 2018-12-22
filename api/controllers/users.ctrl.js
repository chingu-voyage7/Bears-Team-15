const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/main.model').user;

// validators
// const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');

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
 registerUser: async (dataNewUser, res) => {
  // const {errors, isValid} = validateRegisterInput(req.body);
  // if (!isValid) {
  //  return res.status(400).json(errors);
  // }
  // Check to make sure nobody has already registered with a duplicate email
  const user = await User.findOne({ email: dataNewUser.email });
  // Throw a 400 error if the email address already exists
  // errors.email = 'An account with this email already exists';
  if (user) {
   console.log('naa na');
   const status = {
    statusCode: 400,
    isSuccess: false,
    msg: 'User already exist'
   };
   return { ...status }
  } else {

   // Otherwise create a new user
   // Hash and salt password
   const returnsTokenAndStatus = await new Promise((res, rej) => {
    bcrypt.hash(dataNewUser.password, 11, async function (err, hash) {

     // if cant create hash
     if (err) {
      const status = {
       statusCode: 500,
       isSuccess: false,
       msg: 'Can not create HASH!'
      };
      return { ...status }
     }

     const newUser = new User({
      name: dataNewUser.name,
      email: dataNewUser.email,
      password: hash
     });

     const returnNewUser = await newUser.save();
     const payload = {
      name: returnNewUser.name,
      email: returnNewUser.email,
     }

     const tokenAndStatus = await new Promise((res, rej) => {
      jwt.sign(
       payload,
       secretOrKey,
       // Set session expiration to 2 days
       { expiresIn: '2 days' },
       (err, token) => {
        if (err) {
         const status = {
          statusCode: 500,
          isSuccess: true,
          msg: 'can not produce token!'
         };
         rej({ ...status })
        } else {
         const status = {
          statusCode: 200,
          isSuccess: true,
          msg: 'login success'
         };
         res({
          token: `Bearer ${token}`,
          ...status
         });
        }
       }
      );
     });
     // resolved after getting the token
     tokenAndStatus ? res(tokenAndStatus) : rej(tokenAndStatus);
    });
   });
   return returnsTokenAndStatus;
  }
 },

 // FIXME: req, res should be change. ask permission first
 loginUser: async (userData, res) => {
  const { errors, isValid } = validateLoginInput(userData);
  if (!isValid) {
   const status = {
    statusCode: 400,
    isSuccess: false,
    msg: 'invalid address'
   };
   return { ...status };
  }

  // ill comment this one out to test graph
  const { email, password } = userData;

  const user = await User.findOne({ email });
  if (!user) {
   console.log(user, 'user');
   const status = {
    statusCode: 400,
    isSuccess: false,
    msg: 'Incorrect Credentials'
   };
   return { ...status }

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
     { expiresIn: '2 days' },
     (err, token) => {
      if (err) {
       const status = {
        statusCode: 500,
        isSuccess: true,
        msg: 'can not produce token!'
       };
       rej({ ...status })
      } else {
       const status = {
        statusCode: 200,
        isSuccess: true,
        msg: 'login success'
       };
       res({
        token: `Bearer ${token}`,
        ...status
       });
      }
     }
    );
   });

  } else {
   // this will be triggered if the email is correct and password is incorrect
   const status = {
    statusCode: 400,
    isSuccess: false,
    msg: 'Incorrect credentials'
   }
   return { ...status }
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

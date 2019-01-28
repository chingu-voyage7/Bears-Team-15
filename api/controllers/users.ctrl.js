const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/main.model').user;

// validators
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');

// import secret
require('dotenv').config();
const secretOrKey = process.env.SECRET_OR_KEY;

module.exports = {

  getUsers: async () => {
    return await User.find().populate('eventsId');
  },
  getUser: async (data) => {
    return await User.findById(data.id).populate("eventsId");
  },
  // Sign up a new user
  registerUser: async (dataNewUser, res) => {
    const { errors, isValid } = validateRegisterInput(dataNewUser);
    if (!isValid) {
      const status = {
        statusCode: 400,
        isSuccess: false,
        msg: errors,
      };
      console.log(status, 'sdf');
      return status;
    }
    // Check to make sure nobody has already registered with a duplicate email
    const user = await User.findOne({ email: dataNewUser.email });
    // Throw a 400 error if the email address already exists
    // errors.email = 'An account with this email already exists';
    if (user) {
      const status = {
        statusCode: 400,
        isSuccess: false,
        msg: 'User already exist',
      };
      return status;
    } else {
      // Otherwise create a new user
      // Hash and salt password
      const returnsTokenAndStatus = await new Promise((res, rej) => {
        bcrypt.hash(dataNewUser.password, 11, async function (
          err,
          hash
        ) {
          // if cant create hash
          if (err) {
            const status = {
              statusCode: 500,
              isSuccess: false,
              msg: 'Cannot create HASH!',
            };
            return status;
          }

          const newUser = new User({
            firstName: dataNewUser.firstName,
            lastName: dataNewUser.lastName,
            email: dataNewUser.email,
            password: hash,
            age: dataNewUser.age,
            phone: dataNewUser.phone,
            address: dataNewUser.address,
          });

          const returnNewUser = await newUser.save();

          const payload = {
            id: returnNewUser.id,
            lastName: returnNewUser.lastName,
            email: returnNewUser.email,
          };

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
                    msg: 'cannot produce token!',
                  };
                  rej(status);
                } else {
                  const status = {
                    statusCode: 200,
                    isSuccess: true,
                    msg: 'Sign up success',
                  };
                  res({
                    token: `Bearer ${token}`,
                    ...status,
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
        msg: 'invalid address',
      };
      return status;
    }

    // ill comment this one out to test graph
    const { email, password } = userData;

    const user = await User.findOne({ email });
    if (!user) {
      console.log(user, 'user');
      const status = {
        statusCode: 400,
        isSuccess: false,
        msg: 'Incorrect Credentials',
      };
      return status;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.firstName,
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
                msg: 'can not produce token!',
              };
              rej({ ...status });
            } else {
              const status = {
                statusCode: 200,
                isSuccess: true,
                msg: 'login success',
              };
              res({
                token: `Bearer ${token}`,
                ...status,
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
        msg: 'Incorrect credentials',
      };
      return status;
    }
  },

  // Fetch current user
  getCurrentUser: async (data) => {
    const currUser = await User.findOne({ _id: data.id });
    if (currUser) {
      const status = {
        statusCode: 200,
        isSuccess: true,
        msg: 'correct credentials',
      };
      return { ...currUser._doc, ...status };
    } else {
      const status = {
        statusCode: 400,
        isSuccess: false,
        msg: 'incorrect credentials',
      };
      return { ...currUser._doc, ...status };
    }
  },
};

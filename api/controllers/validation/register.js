const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
 const errors = {};

 data.name = !isEmpty(data.name) ? data.name : '';
 data.email = !isEmpty(data.email) ? data.email : '';
 data.password = !isEmpty(data.password) ? data.password : '';
 data.passwordTwo = !isEmpty(data.passwordTwo) ? data.passwordTwo : '';

 if (!Validator.isLength(data.name, {min: 2, max: 30})) {
  errors.name = 'Name must be between 2 and 30 characters';
 }

 if (Validator.isEmpty(data.name)) {
  errors.name = 'Name cannot be blank';
 }

 if (Validator.isEmpty(data.email)) {
  errors.email = 'Email cannot be blank';
 }

 if (!Validator.isEmail(data.email)) {
  errors.email = 'Please enter a valid email';
 }

 if (Validator.isEmpty(data.password)) {
  errors.password = 'Password cannot be blank';
 }

 if (!Validator.isLength(data.password, {min: 6, max: 30})) {
  errors.password = 'Password must be at least 6 characters';
 }

 if (Validator.isEmpty(data.passwordTwo)) {
  errors.passwordTwo = 'Confirm Password field cannot be blank';
 }

 if (!Validator.equals(data.password, data.passwordTwo)) {
  errors.passwordTwo = 'Passwords do not match. Please try again';
 }

 return {
  errors,
  isValid: isEmpty(errors)
 };
};

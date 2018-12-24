const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
 const errors = {};

 data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
 data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
 data.email = !isEmpty(data.email) ? data.email : '';
 data.password = !isEmpty(data.password) ? data.password : '';
 data.passwordTwo = !isEmpty(data.passwordTwo) ? data.passwordTwo : '';

 if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
  errors.firstName = 'First name must be between 2 and 30 characters';
 }

 if (Validator.isEmpty(data.firstName)) {
  errors.firstName = 'First name cannot be blank';
 }

 if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
  errors.lastName = 'Last name must be between 2 and 30 characters';
 }

 if (Validator.isEmpty(data.lastName)) {
  errors.lastName = 'Last name cannot be blank';
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

 if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
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

const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersCtrl = require('../controllers/users.ctrl');
// All Users for now, MUST BE DELETED LATER
router.route('/').get(usersCtrl.getUsers);
// Register a new user
router.route('/register').post(usersCtrl.registerUser);
// Login existing user
router.route('/login').post(usersCtrl.loginUser);
// Get current user
router
 .route('/current')
 .get(passport.authenticate('jwt', {session: false}), usersCtrl.getCurrentUser);
// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({ msg: "Success" });
//   }
// );

module.exports = router;

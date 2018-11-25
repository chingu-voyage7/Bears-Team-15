const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users.ctrl");

router.route("/").get(usersCtrl.helloWorld);

router.route("/register").post(usersCtrl.registerUser);

router.route("/login").post(usersCtrl.loginUser);

module.exports = router;

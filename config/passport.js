const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const User = mongoose.model("users");
const keys = require("../config/keys");

const options = {};
options.jwtFromRequest = ExtractJwt.
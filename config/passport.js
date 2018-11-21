const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const User = mongoose.model("users");
const keys = require("../config/keys");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (payload, done) => {
        User.findById(payload.id)
            .then(user => {
                if (user) {
                    // Return user to frontend
                    return done(null, user);
                } else {
                    // Return false since there is no user
                    return done(null, false);
                }
            })
            .catch(err => console.log(err));
    }));
};
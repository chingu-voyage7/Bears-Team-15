const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
// import secret
const dotenv = require("dotenv").config();
const secretOrKey = process.env.SECRET_OR_KEY;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      // This payload will include items specified in users controller
      User.findById(payload.id)
        .then(user => {
          if (user) {
            // return user to frontend
            return done(null, user);
          }
          // return false if there is no user
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

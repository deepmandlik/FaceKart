const { User } = require("../models/users");
const { Strategy, ExtractJwt } = require("passport-jwt");
const dotenv = require("dotenv");
const { serializeUser } = require('../controllers/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user_id)
        .then(user => {
          if (user) {
            return done(null,serializeUser(user));
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};
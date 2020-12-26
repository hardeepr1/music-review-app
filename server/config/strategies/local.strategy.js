const passport = require('passport');
const { Strategy } = require('passport-local');
const mongoose = require('mongoose');
const debug = require('debug')('app.local.strategy');
const User = mongoose.model('User');

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'userName',
        passwordField: 'password',
      },
      (username, password, done) => {
        User.findOne({ userName: username }).then((user) => {
          if (!user) {
            return done(
              new Error('User with given username does not exist'),
              false
            );
          }

          if (user.password !== passport) {
            return done(
              new Error('Password does not match with this user'),
              false
            );
          }
          return done(null, user);
        });
      }
    )
  );
};

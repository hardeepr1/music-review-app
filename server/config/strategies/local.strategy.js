const passport = require('passport');
const { Strategy } = require('passport-local');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app.local.strategy');
const User = mongoose.model('User');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'userName',
      passwordField: 'password'
    }, (username, password, done) => {
      
      User.findOne({ userName: username })
        .then((user) => {
          if (!user) {
            return done(null, false, "user not found");
          }

          return done(null, user);
        })
    }
  ));
}
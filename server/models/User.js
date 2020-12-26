const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userModel = new Schema({
  fullName: String,
  userName: String,
  password: String,
  role: String,
});

userModel.methods.generateJWTToken = () => {
  const token = jwt.sign({ userName: this.userName }, 'secret', {
    expiresIn: 86400,
  });
  return token;
};

module.exports = mongoose.model('User', userModel);

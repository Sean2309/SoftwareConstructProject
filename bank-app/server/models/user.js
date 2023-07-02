const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // TODO: add other user attributes
    email : String,
    password: String
  });

const user = mongoose.model('User', userSchema);

module.exports = user;
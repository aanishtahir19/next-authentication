var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

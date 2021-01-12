const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  favorites: Array
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

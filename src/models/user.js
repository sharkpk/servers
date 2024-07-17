const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  
});

userSchema.plugin(timestamps);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  const userJson = _.pick(userObject, [
    "_id",
    "email",
    "password",
    "createdAt",
    "updatedAt",
  ]);
  return userJson;
};
const User = mongoose.model("user", userSchema);
module.exports = { User };
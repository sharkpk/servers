const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
    default: "",
  },
  otp: {
    type: String,
    default: "",
  },
  is_registered: {
    type: Boolean,
    default: false,
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
    "otp",
    "is_registered",
    "createdAt",
    "updatedAt",
  ]);
  return userJson;
};
const User = mongoose.model("user", userSchema);
module.exports = { User };

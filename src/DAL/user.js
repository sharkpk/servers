const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const find_user_by_email = async (email) => {
  return await User.findOne({ email: email });
};

const find_user_by_id = async (user_id) => {
  return await User.findOne({ _id: user_id }, "-password");
};
const find_and_delete_user = async (id) => {
  return await User.findByIdAndDelete({ _id: id });
};
const get_all_users = async ({ limit, skip }) => {
  const count = await User.countDocuments();
  const data = await User.find({}, "-password").limit(limit).skip(skip);
  return { data, count };
};

const add_user_password = async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  return user;
};

const add_user_email = async (body) => {
  let user = new User({
    email: body.email,
    password: "",
  });
  return user;
};
const add_user = async (body) => {
  let user = new User({
    email: body.email,
    password: body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save();
  return user;
};

module.exports = {
  find_user_by_id,
  find_user_by_email,
  find_and_delete_user,
  get_all_users,
  add_user_password,
  add_user_email,
  add_user
};

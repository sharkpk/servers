const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const customerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

customerSchema.plugin(timestamps);

customerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  const customerJson = _.pick(customerObject, [
    "_id",
    "first_name",
    "last_name",
    "user_id",
    "createdAt",
    "updatedAt",
  ]);
  return customerJson;
};
const Customer = mongoose.model("customer", customerSchema);
module.exports = { Customer };

const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },

  price: {
    type: String,
    default: "",
  },
});

productSchema.plugin(timestamps);

productSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  const productJson = _.pick(customerObject, [
    "_id",
    "name",
    "image",
    "price",
    "createdAt",
    "updatedAt",
  ]);
  return productJson;
};
const Product = mongoose.model("product", productSchema);
module.exports = { Product };

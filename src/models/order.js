const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  total: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Canceled"],
    default: "Pending",
  },
});

orderSchema.plugin(timestamps);

orderSchema.methods.toJSON = function () {
  const order = this;
  const orderObject = order.toObject();
  const orderJson = _.pick(orderObject, [
    "_id",
    "customer",
    "products",
    "total",
    "status",
    "createdAt",
    "updatedAt",
  ]);
  return orderJson;
};
const Order = mongoose.model("order", orderSchema);
module.exports = { Order };

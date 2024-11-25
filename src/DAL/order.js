const { Order } = require("../models/order");
const customer_aggregation = require("../utilities/aggregation/customer");
const common_aggregation = require("../utilities/aggregation/common");

const find_order_by_id = async (id) => {
  return Order.findById(id).populate("customer").populate("products.product");
};
const find_order_by_customer_id = async (customer_id) => {
  return await Order.find({ customer: customer_id }).populate(
    "products.product"
  );
};

const find_all_order = async ({ limit, skip, filter }) => {
  const count = await Order.find(filter).countDocuments();
  let data = [];
  if (count > 0) {
    data = await Order.find(filter)
      .populate({
        path: "products.product",
        model: "product",
      }).populate({path:'customer',model:'customer'})
      .limit(limit)
      .skip(skip);
  }

  return {
    count,
    skip,
    limit,
    data,
  };
};

const add_order = async (body) => {
  let order = new Order({
    customer: body.customer,
    products: body.products,
    total: body.total,
  });

  return await order.save();
};
const find_and_delete_order = async (id) => {
  return await Order.findOneAndDelete({ _id: id });
};

module.exports = {
  find_order_by_id,
  find_order_by_customer_id,
  find_all_order,
  add_order,
  find_and_delete_order,
};

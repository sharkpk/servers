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

const find_all_order = async ({ limit, skip, filter_aggregation, filter }) => {
  const aggregation_count = [
    common_aggregation.match(filter_aggregation),
    common_aggregation.count,
  ];
  const aggregation = [
    common_aggregation.match(filter_aggregation),
    common_aggregation.skip(skip),
    common_aggregation.limit(limit),
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    { $unwind: "$customer" },
    {
      $lookup: {
        from: "products",
        localField: "products.product",
        foreignField: "_id",
        as: "products.product",
      },
    },
  ];
  const [{ count = 0 } = {}] = await Order.aggregate(aggregation_count);
  let data = [];
  if (count > 0) {
    data = await Order.aggregate(aggregation);
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

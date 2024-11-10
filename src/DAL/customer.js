const { Customer } = require("../models/customer");
const customer_aggregation = require("../utilities/aggregation/customer");
const common_aggregation = require("../utilities/aggregation/common");

const find_customer_by_email = async (email) => {
  return await Customer.aggregate([
    {
      $lookup: {
        from: "user", // The name of the collection to join with
        localField: "user_id", // Field from the `customer` collection
        foreignField: "_id", // Field from the `user` collection
        as: "user", // The name of the field to add to the `customer` documents
      },
    },
    {
      // $unwind: "userDetails", // Optional: If you want to deconstruct the `userDetails` array
    },
  ]).findOne({ email: email });
};

const find_customer_by_id = async (id) => {
  const aggregation = [
    common_aggregation.id(id),
    customer_aggregation.lookup,
    customer_aggregation.unwind,
    customer_aggregation.project,
  ];
  return await Customer.aggregate(aggregation);
};
const find_customer = async (id) => {
  return await Customer.findOne({ _id: id });
};
const find_customer_with_user_id = async (user_id) => {
  return await Customer.findOne({ user_id });
};
const find_and_delete_customer = async (id) => {
  return await Customer.findOneAndDelete({ _id: id });
};
const find_all_customer = async ({
  limit,
  skip,
  filter_aggregation,
  filter,
}) => {
  const aggregation_count = [
    customer_aggregation.lookup,
    customer_aggregation.unwind,
    customer_aggregation.project,
    common_aggregation.match(filter_aggregation),
    common_aggregation.count,
  ];
  const aggregation = [
    customer_aggregation.lookup,
    customer_aggregation.unwind,
    customer_aggregation.project,
    common_aggregation.match(filter_aggregation),
    common_aggregation.skip(skip),
    common_aggregation.limit(limit),
  ];
  const [{ count = 0 } = {}] = await Customer.aggregate(aggregation_count);
  let data = [];
  if (count > 0) {
    data = await Customer.aggregate(aggregation);
  }

  return {
    count,
    skip,
    limit,
    data,
  };
};

const add_customer = async (body) => {
  let customer = new Customer({
    first_name: body.first_name,
    last_name: body.last_name,
    user_id: body.user_id,
  });

  return await customer.save();
};

module.exports = {
  find_customer_by_email,
  add_customer,
  find_all_customer,
  find_customer_by_id,
  find_and_delete_customer,
  find_customer,
  find_customer_with_user_id,
};

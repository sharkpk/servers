const { Product } = require("../models/product");
const customer_aggregation = require("../utilities/aggregation/customer");
const common_aggregation = require("../utilities/aggregation/common");

const find_product_by_name = async (name) => {
  return await Product.find({ name });
};

const find_product_by_id = async (id) => {
  const aggregation = [common_aggregation.id(id)];
  return await Product.aggregate(aggregation);
};

const find_all_product = async ({
  limit,
  skip,
  filter_aggregation,
  filter,
}) => {
  const aggregation_count = [
    common_aggregation.match(filter_aggregation),
    common_aggregation.count,
  ];
  const aggregation = [
    common_aggregation.match(filter_aggregation),
    common_aggregation.skip(skip),
    common_aggregation.limit(limit),
  ];
  const [{ count = 0 } = {}] = await Product.aggregate(aggregation_count);
  let data = [];
  if (count > 0) {
    data = await Product.aggregate(aggregation);
  }

  return {
    count,
    skip,
    limit,
    data,
  };
};

const add_product = async (body) => {
  let product = new Product({
    name: body.name,
    image: body.image,
    price: body.price,
  });

  return await product.save();
};
const find_and_delete_product = async (id) => {
  return await Product.findOneAndDelete({ _id: id });
};

module.exports = {
  add_product,
  find_all_product,
  find_product_by_id,
  find_product_by_name,
  find_and_delete_product,
};

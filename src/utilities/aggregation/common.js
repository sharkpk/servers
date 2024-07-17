const { default: mongoose } = require("mongoose");

const common_aggregation = {
  id: (id) => ({
    $match: { _id: new mongoose.Types.ObjectId(`${id}`) },
  }),
  skip: (skip) => ({
    $skip: skip,
  }),
  limit: (limit) => ({
    $limit: limit,
  }),
  match: (filter) => ({
    $match: filter,
  }),
  count: { $count: "count" },
};

module.exports = common_aggregation;

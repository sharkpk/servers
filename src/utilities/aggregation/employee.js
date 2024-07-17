
const employee_aggregation = {
  lookup: {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user",
    },
  },
  unwind: {
    $unwind: "$user",
  },
  project: {
    $project: {
      _id: 1,
      first_name: 1,
      last_name: 1,
      user_id: 1,
      updatedAt: 1,
      createdAt: 1,
      "user.email": 1,
      "user._id": 1,
    },
  },
};

module.exports = employee_aggregation;

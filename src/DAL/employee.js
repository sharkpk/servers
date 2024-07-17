const { Employee } = require("../models/employee");
const employee_aggregation = require("../utilities/aggregation/employee");
const common_aggregation = require("../utilities/aggregation/common");

const find_employee_by_email = async (email) => {
  return await Employee.aggregate([
    {
      $lookup: {
        from: "user", // The name of the collection to join with
        localField: "user_id", // Field from the `employee` collection
        foreignField: "_id", // Field from the `user` collection
        as: "user", // The name of the field to add to the `employee` documents
      },
    },
    {
      // $unwind: "userDetails", // Optional: If you want to deconstruct the `userDetails` array
    },
  ]).findOne({ email: email });
};

const find_employee_by_id = async (id) => {
  const aggregation = [
    common_aggregation.id(id),
    employee_aggregation.lookup,
    employee_aggregation.unwind,
    employee_aggregation.project,
  ];
  return await Employee.aggregate(aggregation);
};
const find_employee = async (id) => {
  return await Employee.findOne({ _id: id });
};
const find_employee_with_user_id = async (user_id) => {
  return await Employee.findOne({ user_id });
};
const find_and_delete_employee = async (id) => {
  return await Employee.findOneAndDelete({ _id: id });
};
const find_all_employee = async ({
  limit,
  skip,
  filter_aggregation,
  filter,
}) => {
  const aggregation_count = [
    employee_aggregation.lookup,
    employee_aggregation.unwind,
    employee_aggregation.project,
    common_aggregation.match(filter_aggregation),
    common_aggregation.count,
  ];
  const aggregation = [
    employee_aggregation.lookup,
    employee_aggregation.unwind,
    employee_aggregation.project,
    common_aggregation.match(filter_aggregation),
    common_aggregation.skip(skip),
    common_aggregation.limit(limit),
  ];
  const [{ count }] = await Employee.aggregate(aggregation_count);
  const data = await Employee.aggregate(aggregation);

  return {
    count,
    skip,
    limit,
    data,
  };
};

const add_employee = async (body) => {
  let employee = new Employee({
    first_name: body.first_name,
    last_name: body.last_name,
    user_id: body.user_id,
  });

  return await employee.save();
};

module.exports = {
  find_employee_by_email,
  add_employee,
  find_all_employee,
  find_employee_by_id,
  find_and_delete_employee,
  find_employee,
  find_employee_with_user_id
};

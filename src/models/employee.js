const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default:''
  },
  last_name: {
    type: String,
    default:''
  },

  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
});

employeeSchema.plugin(timestamps);

employeeSchema.methods.toJSON = function () {
  const employee = this;
  const employeeObject = employee.toObject();
  const employeeJson = _.pick(employeeObject, [
    "_id",
    "first_name",
    "last_name",
    "user_id",
    "createdAt",
    "updatedAt",
  ]);
  return employeeJson;
};
const Employee = mongoose.model("employee", employeeSchema);
module.exports = { Employee };

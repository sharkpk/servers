const { addEmployee } = require("../../services/employee");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
    add_employee_validation_schema,
} = require("../../utilities/validation/employee");

const add_employee = async (req, res) => {
  try {
    try {
      await add_employee_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await addEmployee(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data
        });
      }

      res.status(201).json({
        code: 201,
        message: "Employee Added Successfully",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({status:400,message:error.message});
  }
};

module.exports = add_employee;

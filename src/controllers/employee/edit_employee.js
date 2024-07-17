const { editEmployee } = require("../../services/employee");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  edit_employee_validation_schema,
} = require("../../utilities/validation/employee");

const edit_employee = async (req, res) => {
  try {
    try {
      await edit_employee_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await editEmployee(req.body,req.params);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data
        });
      }

      res.status(201).json({
        code: 201,
        message: "Employee Editted Successfully",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({status:400,message:error.message});
  }
};

module.exports = edit_employee;

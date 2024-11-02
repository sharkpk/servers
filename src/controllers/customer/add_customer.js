const { addCustomer } = require("../../services/customer");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  add_customer_validation_schema,
} = require("../../utilities/validation/customer");

const add_customer = async (req, res) => {
  try {
    try {
      await add_customer_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await addCustomer(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data,
        });
      }

      res.status(201).json({
        code: 201,
        message: "Customer Added Successfully",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = add_customer;

const { addOrder } = require("../../services/order");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  add_order_validation_schema,
} = require("../../utilities/validation/order");

const add_order = async (req, res) => {
  try {
    try {

      await add_order_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await addOrder(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data,
        });
      }

      res.status(201).json({
        code: 201,
        message: "Order Added Successfully",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = add_order;

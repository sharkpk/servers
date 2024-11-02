const { editCustomer } = require("../../services/customer");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  edit_customer_validation_schema,
} = require("../../utilities/validation/customer");

const edit_customer = async (req, res) => {
  try {
    try {
      await edit_customer_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await editCustomer(req.body,req.params);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data
        });
      }

      res.status(200).json({
        code: 200,
        message: "Customer Editted Successfully",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({status:400,message:error.message});
  }
};

module.exports = edit_customer;

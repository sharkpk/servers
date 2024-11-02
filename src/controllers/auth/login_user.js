const { login } = require("../../services/auth");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const { login_validation_schema } = require("../../utilities/validation/auth");

const login_user = async (req, res) => {
  try {
    try {
      await login_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      console.log("first");
      const { error, message, data } = await login(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data,
        });
      }

      res.status(200).json({
        code: 200,
        message: "Successfully Logged In",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = login_user;

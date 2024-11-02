const { logout } = require("../../services/auth");
const catch_validation_errors = require("../../utilities/catch_validation_errors");

const logout_user = async (req, res) => {
  try {
    try {
      const { error, message, data } = await logout(req.header("x-sh-auth"));
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data
        });
      }

      res.status(200).json({
        code: 200,
        message: "Successfully Logged Out",
        ...data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({status:400,message:error.message});
  }
};

module.exports = logout_user;

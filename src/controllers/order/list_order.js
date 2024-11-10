const { listOrder } = require("../../services/order");
const catch_validation_errors = require("../../utilities/catch_validation_errors");

const list_order = async (req, res) => {
  try {
    try {
      const { error, message, data } = await listOrder(req.query);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data,
        });
      }

      res.status(200).json({
        code: 200,
        message: "Orders List",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = list_order;

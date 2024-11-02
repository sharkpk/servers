const { detailCustomer } = require("../../services/customer");
const detail_customer = async (req, res) => {
  try {
    const { error, message, data } = await detailCustomer(req.params);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Customer Detail",
      data,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = detail_customer;

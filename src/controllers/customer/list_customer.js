const {  listCustomer } = require("../../services/customer");
const list_customer = async (req, res) => {
  try {
    const { error, message, data } = await listCustomer(req.query);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Customer List",
      ...data,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = list_customer;

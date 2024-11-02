const {  deleteCustomer } = require("../../services/customer");
const delete_customer = async (req, res) => {
  try {
    const { error, message, data } = await deleteCustomer(req.params);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: message,
      });
    }

    res.status(204).json({
      code: 204,
      message: "Customer Deleted",
      data,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = delete_customer;

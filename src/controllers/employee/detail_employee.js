const { detailEmployee } = require("../../services/employee");
const detail_employee = async (req, res) => {
  try {
    const { error, message, data } = await detailEmployee(req.params);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Employee Detail",
      data,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = detail_employee;

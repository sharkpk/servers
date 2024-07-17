const {  deleteEmployee } = require("../../services/employee");
const delete_employee = async (req, res) => {
  try {
    const { error, message, data } = await deleteEmployee(req.params);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: message,
      });
    }

    res.status(204).json({
      code: 204,
      message: "Employee Deleted",
      data,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = delete_employee;

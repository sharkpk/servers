const { deleteProduct } = require("../../services/product");
const catch_validation_errors = require("../../utilities/catch_validation_errors");

const delete_product = async (req, res) => {
  try {
    try {
      const { error, message, data } = await deleteProduct(req.params);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data,
        });
      }

      res.status(200).json({
        code: 200,
        message: "Product Deleted",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = delete_product;

const yup = require("yup");

const add_product_validation_schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
});

module.exports = {
  add_product_validation_schema,
};

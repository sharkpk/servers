const yup = require("yup");

const add_order_validation_schema = yup.object().shape({
  customer: yup.string().required("Customer is required"),
  products: yup.array().of(
    yup.object().shape({
      product: yup.string().required("Product Id is required"),
      quantity: yup.number().min(1, "Must be greater than 0").required('quantity against product is required'),
    }),
  ),
});

module.exports = {
  add_order_validation_schema,
};

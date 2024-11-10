const yup = require("yup");

const add_product_validation_schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
});

module.exports = {
    add_product_validation_schema,
};

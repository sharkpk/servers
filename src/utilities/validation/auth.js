const yup = require("yup");

const login_validation_schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(100),
});

module.exports = {
  login_validation_schema,
};

const yup = require("yup");

const send_user_otp_validation_schema = yup.object().shape({
  email: yup.string().email().required(),
});
const verify_user_otp_validation_schema = yup.object().shape({
  email: yup.string().email().required(),
  otp: yup.string().required(),
});

module.exports = {
  send_user_otp_validation_schema,
  verify_user_otp_validation_schema,
};

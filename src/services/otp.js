const { find_user_by_email, add_user_email } = require("../DAL/user");
const {
  email_template_with_otp,
  generate_otp,
} = require("../utilities/generate_otp");
const { send_email } = require("../libs/nodemailer");

//********************************************{Send User OTP}********************************************************/
const _findOrCreateUser = async (body, otp) => {
  let user = await find_user_by_email(body.email);
  if (!user) {
    user = await add_user_email(body);
  }

  user.otp = otp;
  user.save();
  return user;
};

const _sendUserOTP = async (body, resp) => {
  const otp = generate_otp();
  const user = await _findOrCreateUser(body, otp);
  if (!user) {
    resp.error = "Somthing Went Wrong ";
    resp.message = "Somthing Went Wrong";
    resp.data = {};
    return resp;
  }

  const otp_template = email_template_with_otp(otp);

  const {
    error = false,
    message = "",
    data = {},
  } = await send_email(body.email, "OTP", "", otp_template);

  resp.error = error;
  resp.message = message;
  resp.data = data;
  return resp;
};
const sendUserOTP = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _sendUserOTP(body, resp);
  return resp;
};

//********************************************{Verify User OTP}********************************************************/

const _verifyUserOTP = async (body, resp) => {
  let user = await find_user_by_email(body.email);

  if (!user) {
    resp.error = "User not Exist";
    resp.message = "User not Exist";
    resp.data = {};
    return resp;
  }
  if (user.otp !== body.otp) {
    resp.error = "Invalid OTP";
    resp.message = "Invalid OTP";
    resp.data = {};
    return resp;
  }
  user = user.toObject();
  delete user.password;
  delete user.otp;
  resp.error = "";
  resp.message = "User Verified";
  resp.data = user;
  return resp;
};
const verifyUserOTP = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _verifyUserOTP(body, resp);
  return resp;
};

module.exports = { sendUserOTP, verifyUserOTP };

const express = require("express");
const { create_route } = require("../utilities/createRoute");
const send_otp_user = require("../../controllers/otp/send_otp_user");
const verify_otp_user = require("../../controllers/otp/verify_otp_user");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/user",
  auth_enable: false,
  post_method: send_otp_user,
});
create_route({
  router,
  route: "/user/verify",
  auth_enable: false,
  post_method: verify_otp_user,
});

module.exports = router;

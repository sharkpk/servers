const express = require("express");
const { create_route } = require("../utilities/createRoute");
const login_user = require("../../controllers/auth/login_user");
const logout_user = require("../../controllers/auth/logout_user");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/login",
  auth_enable: false,
  post_method: login_user,
});
create_route({
  router,
  route: "/logout",
  auth_enable: false,
  post_method: logout_user,
});



module.exports = router;

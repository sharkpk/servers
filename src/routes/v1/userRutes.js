const express = require("express");
const { create_route } = require("./utilities/createRoute");
const add_user = require("../controllers/user/add_user");
const list_user = require("../controllers/user/list_user");
const detail_user = require("../controllers/user/detail_user");
const delete_user = require("../controllers/user/delete_user");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/",
  auth_enable: false,
  get_method: list_user,
});

create_route({
  router,
  route: "/:id",
  auth_enable: false,
  get_method: detail_user,
});

create_route({
  router,
  route: "/",
  auth_enable: false,
  post_method: add_user,
});
create_route({
  router,
  route: "/:id",
  auth_enable: false,
  delete_method: delete_user,
});

module.exports = router;

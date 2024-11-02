const express = require("express");
const { create_route } = require("../utilities/createRoute");
const add_customer = require("../../controllers/customer/add_customer");
const edit_customer = require("../../controllers/customer/edit_customer");
const delete_customer = require("../../controllers/customer/delete_customer");
const detail_customer = require("../../controllers/customer/detail_customer");
const list_customer = require("../../controllers/customer/list_customer");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/",
  auth_enable: false,
  post_method: add_customer,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  put_method: edit_customer,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  delete_method: delete_customer,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  get_method: detail_customer,
});
create_route({
  router,
  route: "/",
  auth_enable: true,
  get_method: list_customer,
});



module.exports = router;

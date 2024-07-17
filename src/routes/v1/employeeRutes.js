const express = require("express");
const { create_route } = require("../utilities/createRoute");
const add_employee = require("../../controllers/employee/add_employee");
const edit_employee = require("../../controllers/employee/edit_employee");
const delete_employee = require("../../controllers/employee/delete_employee");
const detail_employee = require("../../controllers/employee/detail_employee");
const list_employee = require("../../controllers/employee/list_employee");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/",
  auth_enable: true,
  post_method: add_employee,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  put_method: edit_employee,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  delete_method: delete_employee,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  get_method: detail_employee,
});
create_route({
  router,
  route: "/",
  auth_enable: true,
  get_method: list_employee,
});



module.exports = router;

const express = require("express");
const { create_route } = require("../utilities/createRoute");
const add_product = require("../../controllers/product/add_product");
const list_product = require("../../controllers/product/list_product");
const detail_product = require("../../controllers/product/detail_product");
const delete_product = require("../../controllers/product/delete_product");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/",
  auth_enable: true,
  post_method: add_product,
});

create_route({
  router,
  route: "/:id",
  auth_enable: true,
  delete_method: delete_product,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  get_method: detail_product,
});
create_route({
  router,
  route: "/",
  auth_enable: true,
  get_method: list_product,
});

module.exports = router;

const express = require("express");
const { create_route } = require("../utilities/createRoute");
const add_order = require("../../controllers/order/add_order");
const list_order = require("../../controllers/order/list_order");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/",
  auth_enable: false,
  post_method: add_order,
});

// create_route({
//   router,
//   route: "/:id",
//   auth_enable: true,
//   delete_method: delete_product,
// });
// create_route({
//   router,
//   route: "/:id",
//   auth_enable: true,
//   get_method: detail_product,
// });
create_route({
  router,
  route: "/",
  auth_enable: true,
  get_method: list_order,
});

module.exports = router;

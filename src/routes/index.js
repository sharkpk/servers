const express = require("express");
const router = express.Router();

const authRoutes = require("./v1/authRoutes");
const customerRoutes = require("./v1/customerRutes");
const productRoutes = require("./v1/productRutes");
const orderRoutes = require("./v1/orderRutes");

router.use("/auth", authRoutes);
router.use("/customer", customerRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);

module.exports = router;

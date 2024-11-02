const express = require("express");
const router = express.Router();

const authRoutes = require("./v1/authRoutes");
const customerRoutes = require("./v1/customerRutes");
const otpRoutes = require("./v1/otpRoutes");

router.use("/auth", authRoutes);
// router.use('/users',userRoutes)
router.use("/customer", customerRoutes);
router.use("/otp", otpRoutes);

module.exports = router;

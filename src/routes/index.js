const express = require("express");
const router = express.Router();

const authRoutes=require('./v1/authRoutes')
// const userRoutes=require('./v1/userRutes')
const employeeRoutes=require('./v1/employeeRutes')


router.use('/auth',authRoutes)
// router.use('/users',userRoutes)
router.use('/employee',employeeRoutes)

module.exports = router;

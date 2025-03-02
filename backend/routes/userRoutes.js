const express = require("express");
const authenticationToken = require("../middleware/auth");
const { getUserInfo } = require("../controllers/userController");
const router = express.Router();

// Protected Routes
router.get("/userInfo",authenticationToken,getUserInfo);

module.exports=router
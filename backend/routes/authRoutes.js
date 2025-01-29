const express = require("express");
const router = express.Router();
const { signinUser } = require("../controllers/authController");

router.post("/signin", signinUser);

module.exports = router;

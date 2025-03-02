const express = require("express");
const router = express.Router();
const { signinUser,signupUser,linkedinSignin,linkedinCallback } = require("../controllers/authController");

// signin, signup routes

router.post("/signup", signupUser);
router.post("/signin", signinUser);

//linkedIn authorization and callback
router.get('/linkedin',linkedinSignin);
router.get('/linkedin/callback',linkedinCallback);

module.exports = router;

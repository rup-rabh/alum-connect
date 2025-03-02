const express = require("express");
const authenticationToken = require("../middleware/auth");
const router = express.Router();

const { alum_internship } = require("../controllers/alumniController");

// Protected Routes
router.post("/alum_internship",authenticationToken,alum_internship);

module.exports=router
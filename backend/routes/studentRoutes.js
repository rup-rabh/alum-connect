const express = require("express");
const authenticationToken = require("../middleware/auth");
const { getAllInternships, applyInternships, getAppliedInternships } = require("../controllers/studentController");
const router = express.Router();


// Protected Routes

// Internships Routes
router.get("/getAllInternships",authenticationToken,getAllInternships)
router.post("/applyInternships",authenticationToken,applyInternships)
router.get("/getAppliedInternships",authenticationToken,getAppliedInternships)

// Become a mentee Routes

module.exports=router
const express = require("express");
const authenticationToken = require("../middleware/auth");
const { getAllInternships, applyInternship, getAppliedInternships } = require("../controllers/studentController");
const router = express.Router();


// Protected Routes
// complete student profile

// Internships Routes
router.get("/getAllInternships",authenticationToken,getAllInternships)
router.post("/applyInternship/:id",authenticationToken,applyInternship)
router.get("/getAppliedInternships",authenticationToken,getAppliedInternships)

// Become a mentee Routes

module.exports=router
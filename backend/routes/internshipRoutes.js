const express = require("express");
const authenticationToken = require("../middleware/auth");
const { getInternshipById,  } = require("../controllers/internshipController");

const router = express.Router();


// Protected Routes
// complete student profile
router.get("/getInternship/:id",authenticationToken ,getInternshipById);
// router.get("/getStatus/:id",authenticationToken ,getStatus);

module.exports=router
const express = require("express");
const authenticationToken = require("../middleware/auth");
const { getAllInternships, applyInternship, getAppliedInternships, getAcceptedInternships,getRejectedInternships } = require("../controllers/studentController");
const { isStudent, isStudentWithBasicProfile } = require("../middleware/studentMiddleware");
const { addBasicProfile, addExperience, getBasicProfile, getExperience } = require("../controllers/profile Controllers/studentProfileController");

const router = express.Router();


// Protected Routes
// complete student profile
router.post("/addBasicProfile",authenticationToken ,isStudent,addBasicProfile)
router.post("/addExperience",authenticationToken,isStudentWithBasicProfile,addExperience)

router.get("/getBasicProfile",authenticationToken ,isStudentWithBasicProfile,getBasicProfile)
router.get("/getExperience",authenticationToken,isStudentWithBasicProfile,getExperience)

// Internships Routes
router.get("/getAllInternships",authenticationToken,isStudent,getAllInternships)

router.post("/applyInternship/:id",authenticationToken, isStudentWithBasicProfile,applyInternship)
router.get("/getAppliedInternships",authenticationToken, isStudentWithBasicProfile ,getAppliedInternships)
router.post("getAcceptedInternships",authenticationToken,isStudentWithBasicProfile,getAcceptedInternships)
router.get("/getRejectedInternships",authenticationToken,isStudentWithBasicProfile,getRejectedInternships)

// Become a mentee Routes

module.exports=router
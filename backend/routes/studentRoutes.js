const express = require("express");
const authenticationToken = require("../middleware/auth");
const { getAllInternships, applyInternship, getAppliedInternships, getAcceptedInternships,getRejectedInternships,getAllMentors,connectToMentor} = require("../controllers/studentController");
const { isStudent, isStudentWithBasicProfile } = require("../middleware/studentMiddleware");
const { addBasicProfile, addExperience, getBasicProfile, getExperience, updateBasicProfile } = require("../controllers/profile Controllers/studentProfileController");
const {getMentorProfile}  = require("../controllers/profile Controllers/alumniProfileController")

const router = express.Router();

// Protected Routes
// complete student profile
router.post("/addBasicProfile",authenticationToken ,isStudent,addBasicProfile)
router.put("/updateBasicProfile",authenticationToken ,isStudentWithBasicProfile,updateBasicProfile)
router.post("/addExperience",authenticationToken,isStudentWithBasicProfile,addExperience)

router.get("/getBasicProfile",authenticationToken ,isStudentWithBasicProfile,getBasicProfile)
router.get("/getExperience",authenticationToken,isStudentWithBasicProfile,getExperience)

// Internships Routes
router.get("/getAllInternships",authenticationToken,isStudent,getAllInternships)

router.post("/applyInternship/:id",authenticationToken, isStudentWithBasicProfile,applyInternship)
router.get("/getAppliedInternships",authenticationToken, isStudentWithBasicProfile ,getAppliedInternships)
router.post("getAcceptedInternships",authenticationToken,isStudentWithBasicProfile,getAcceptedInternships)
router.get("/getRejectedInternships",authenticationToken,isStudentWithBasicProfile,getRejectedInternships)

// mentee Routes


router.get("/getMentors",authenticationToken,isStudent,getAllMentors);
router.post("/getMentorProfile", authenticationToken, isStudent , getMentorProfile);
router.post("/connectMentor",authenticationToken,isStudent,connectToMentor)

module.exports=router
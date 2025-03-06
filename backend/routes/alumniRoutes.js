const express = require("express");
const authenticationToken = require("../middleware/auth");
const {isAlumni, isAlumWithBasicProfile} = require("../middleware/alumniMiddleware")
const router = express.Router();

const {addBasicProfile, addExperience, getBasicProfile, getExperience}= require("../controllers/profile Controllers/alumniProfileController");
const {postInternship,getPendingApplications, acceptStudent,rejectStudent, closeInternship, updateInternship, getPostedInternships } = require("../controllers/alumniController");

// Protected Routes - Only Alumni can access
// complete profile
router.post("/addBasicProfile",authenticationToken ,isAlumni,addBasicProfile)
router.post("/addExperience",authenticationToken,isAlumWithBasicProfile,addExperience)

router.get("/getBasicProfile",authenticationToken ,isAlumWithBasicProfile,getBasicProfile)
router.get("/getExperience",authenticationToken,isAlumWithBasicProfile,getExperience)

// feature routes
router.post("/postInternship", authenticationToken, isAlumWithBasicProfile, postInternship);
router.get("/getPostedInternships", authenticationToken, isAlumWithBasicProfile, getPostedInternships);
router.get("/getPendingApplications/:id",authenticationToken,isAlumWithBasicProfile,getPendingApplications);
router.patch("/acceptInternship/:id",authenticationToken,isAlumWithBasicProfile,acceptStudent);
router.patch("/rejectStudent/:id",authenticationToken,isAlumWithBasicProfile,rejectStudent);

router.patch("/closeInternship/:id", authenticationToken, isAlumWithBasicProfile, closeInternship);
router.put("/updateInternship/:id", authenticationToken, isAlumWithBasicProfile, updateInternship);

module.exports = router;

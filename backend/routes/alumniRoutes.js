const express = require("express");
const authenticationToken = require("../middleware/auth");
const { isAlumni, isAlumWithBasicProfile ,isMentor} = require("../middleware/alumniMiddleware")
const router = express.Router();
const { addBasicProfile, 
    addExperience, 
    getBasicProfile, 
    getExperience, 
    addMentorProfile, 
    getMentorProfile } = require("../controllers/profile Controllers/alumniProfileController");
const { postInternship, 
    getPendingApplications,
    acceptStudent,
    rejectStudent,
    closeInternship,
    updateInternship,
    getPostedInternships,
    getMentorshipsForMentor,
    acceptMentorship,
    sendMentorStatus } = require("../controllers/alumniController");

const { route } = require("./authRoutes");

// Protected Routes - Only Alumni can access
// complete profile
router.post("/addBasicProfile", authenticationToken, isAlumni, addBasicProfile)
router.post("/addExperience", authenticationToken, isAlumWithBasicProfile, addExperience)

router.get("/getBasicProfile", authenticationToken, isAlumWithBasicProfile, getBasicProfile)
router.get("/getExperience", authenticationToken, isAlumWithBasicProfile, getExperience)

// feature routes
router.post("/postInternship", authenticationToken, isAlumWithBasicProfile, postInternship);
router.get("/getPostedInternships", authenticationToken, isAlumWithBasicProfile, getPostedInternships);
router.get("/getPendingApplications/:id", authenticationToken, isAlumWithBasicProfile, getPendingApplications);
router.patch("/acceptInternship/:id", authenticationToken, isAlumWithBasicProfile, acceptStudent);
router.patch("/rejectStudent/:id", authenticationToken, isAlumWithBasicProfile, rejectStudent);

router.patch("/closeInternship/:id", authenticationToken, isAlumWithBasicProfile, closeInternship);
router.put("/updateInternship/:id", authenticationToken, isAlumWithBasicProfile, updateInternship);
//mentorship routes
router.get("/mentorshipStatus",authenticationToken,isAlumWithBasicProfile,isMentor,sendMentorStatus)

router.post("/setMentorProfile", authenticationToken, isAlumWithBasicProfile, addMentorProfile);
router.get("/getMentorProfile", authenticationToken, isAlumWithBasicProfile, isMentor, getMentorProfile);


router.get("/getMentorshipsForMentors",authenticationToken,isAlumWithBasicProfile,isMentor,getMentorshipsForMentor);
router.patch("/acceptMentorship",authenticationToken,isAlumWithBasicProfile,isMentor,acceptMentorship);

module.exports = router;

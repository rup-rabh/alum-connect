const express = require("express");
const authenticationToken = require("../middleware/auth");
const { isAlumni, isAlumWithBasicProfile ,isMentor} = require("../middleware/alumniMiddleware")
const router = express.Router();
const { addBasicProfile, 
    addExperience, 
    getBasicProfile, 
    getExperience, 
    addMentorProfile, 
    getMentorProfile,
    updateBasicProfile,
    updateMentorProfile} = require("../controllers/profile Controllers/alumniProfileController");
const { postInternship, 
    getAllApplications,
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
router.put("/updateBasicProfile", authenticationToken, isAlumWithBasicProfile, updateBasicProfile)

router.post("/addExperience", authenticationToken, isAlumWithBasicProfile, addExperience)

router.get("/getBasicProfile", authenticationToken, isAlumWithBasicProfile, getBasicProfile)
router.get("/getExperience", authenticationToken, isAlumWithBasicProfile, getExperience)


// feature routes
router.post("/postInternship", authenticationToken, isAlumWithBasicProfile, postInternship);
router.get("/getPostedInternships", authenticationToken, isAlumWithBasicProfile, getPostedInternships);
router.get("/getAllApplications/:id", authenticationToken, isAlumWithBasicProfile, getAllApplications);
router.patch("/acceptStudent/:id", authenticationToken, isAlumWithBasicProfile, acceptStudent);
router.patch("/rejectStudent/:id", authenticationToken, isAlumWithBasicProfile, rejectStudent);

router.patch("/closeInternship/:id", authenticationToken, isAlumWithBasicProfile, closeInternship);
router.put("/updateInternship/:id", authenticationToken, isAlumWithBasicProfile, updateInternship);
//mentorship routes
router.get("/mentorshipStatus",authenticationToken,isAlumWithBasicProfile,isMentor,sendMentorStatus)

router.post("/setMentorProfile", authenticationToken, isAlumWithBasicProfile, addMentorProfile);
router.post("/getMentorProfile", authenticationToken, isAlumWithBasicProfile, isMentor, getMentorProfile);
router.patch("/setMentorProfile", authenticationToken, isAlumWithBasicProfile, isMentor,updateMentorProfile );


router.get("/getMentorshipsForMentors",authenticationToken,isAlumWithBasicProfile,isMentor,getMentorshipsForMentor);
router.patch("/acceptMentorship",authenticationToken,isAlumWithBasicProfile,isMentor,acceptMentorship);

module.exports = router;

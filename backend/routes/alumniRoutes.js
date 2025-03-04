const express = require("express");
const authenticationToken = require("../middleware/auth");
const {isAlumni, isAlumWithBasicProfile} = require("../middleware/alumniMiddleware")
const router = express.Router();

const {addBasicProfile, addExperience, getBasicProfile, getExperience}= require("../controllers/profile Controllers/alumniProfileController");
const {postInternship, closeInternship, updateInternship, getInternPostsById } = require("../controllers/alumniController");

// Protected Routes - Only Alumni can access
// complete profile
router.post("/addBasicProfile",authenticationToken ,isAlumni,addBasicProfile)
router.post("/addExperience",authenticationToken,isAlumWithBasicProfile,addExperience)

router.get("/getBasicProfile",authenticationToken ,isAlumWithBasicProfile,getBasicProfile)
router.get("/getExperience",authenticationToken,isAlumWithBasicProfile,getExperience)

// feature routes
router.post("/postInternship", authenticationToken, isAlumWithBasicProfile, postInternship);
router.get("/getInternPostsById", authenticationToken, isAlumWithBasicProfile, getInternPostsById);
router.put("/closeInternship/:id", authenticationToken, isAlumWithBasicProfile, closeInternship);
router.put("/updateInternship/:id", authenticationToken, isAlumWithBasicProfile, updateInternship);

module.exports = router;

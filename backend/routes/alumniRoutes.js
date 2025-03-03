const express = require("express");
const authenticationToken = require("../middleware/auth");
const {isAlumni, isAlumWithProfile} = require("../middleware/isAlumni")
const router = express.Router();

const { completeProfile, postInternship, closeInternship, updateInternship, getInternPostsById } = require("../controllers/alumniController");

// Protected Routes - Only Alumni can access
// complete profile
router.post("/completeProfile",authenticationToken ,isAlumni,completeProfile)
// feature routes
router.post("/postInternship", authenticationToken, isAlumWithProfile, postInternship);
router.get("/getInternPostsById", authenticationToken, isAlumWithProfile, getInternPostsById);
router.put("/closeInternship/:id", authenticationToken, isAlumWithProfile, closeInternship);
router.put("/updateInternship/:id", authenticationToken, isAlumWithProfile, updateInternship);

module.exports = router;

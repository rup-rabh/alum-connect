const express = require("express");
const authenticationToken = require("../middleware/auth");
const {roleSpeceficMiddleware ,isMentor} = require("../middleware/mentorMiddleware");
const {addProfile, getProfile} = require("../controllers/profile Controllers/mentorProfileController")
const {getAllMentors} = require("../controllers/mentorController");
const router = express.Router();

router.post("/setProfile",authenticationToken,roleSpeceficMiddleware,addProfile);
router.get("/getProfile",authenticationToken,roleSpeceficMiddleware,isMentor,getProfile);

router.get("/getMentors",authenticationToken,getAllMentors);

module.exports = router;
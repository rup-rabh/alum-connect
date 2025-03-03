const express = require("express");
const authenticationToken = require("../middleware/auth");
const isAlumni = require("../middleware/isAlumni").default.default; // Import the new middleware
const router = express.Router();

const { postInternship, closeInternship, updateInternship, getInternPostsById } = require("../controllers/alumniController");

// Protected Routes - Only Alumni can access
router.post("/postInternship", authenticationToken, isAlumni, postInternship);
router.get("/getInternPostsById", authenticationToken, isAlumni, getInternPostsById);
router.put("/closeInternship/:id", authenticationToken, isAlumni, closeInternship);
router.put("/updateInternship/:id", authenticationToken, isAlumni, updateInternship);

module.exports = router;

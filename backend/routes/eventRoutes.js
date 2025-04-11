const express = require("express");
const authenticationToken = require("../middleware/auth");
const { getUpcomingEvents, getPastEvents, regsiterForUpcomingEvent } = require("../controllers/eventsController");

const router = express.Router();


router.get("/getUpcomingEvents",authenticationToken,getUpcomingEvents);
router.get("/getPastEvents",authenticationToken,getPastEvents);
router.post("/regsiterForUpcomingEvent",authenticationToken,regsiterForUpcomingEvent);

module.exports=router
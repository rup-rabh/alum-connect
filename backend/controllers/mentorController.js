const prisma = require("../utils/prismaClient")

//so what should the features for mentors?
// 1. Find mentors , with filters (later maybe)
// 2. Connect with mentors
// 3. Grouping with mentors should be another features of groups maybe

const getAllMentors = async (req,res)=>{
    try {
        const mentors = await prisma.mentor.findMany();
        return res.status(201).json({mentors});
    } catch (error) {
        console.error("Error in getAllMentors:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const connectToMentor = async (req, res) => {
    try {
      const { mentorId } = req.body; 
      const menteeId = req.userId; // Mentee ID from the authenticated user
  
      const mentor = await prisma.mentor.findUnique({
        where: { id: mentorId },
      });
  
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      const existingConnection = await prisma.mentorship.findUnique({
        where: {
          mentorId_menteeId: {
            mentorId,
            menteeId,
          },
        },
      });
  
      if (existingConnection) {
        return res.status(400).json({ message: "You have already sent a request to this mentor" });
      }  
      if (mentor.currentMentees >= mentor.maxMentees) {
        return res.status(400).json({ message: "This mentor has reached their maximum mentee limit" });
      }
      const newMentorship = await prisma.mentorship.create({
        data: {
          mentorId,
          menteeId,
          status: "PENDING",
        },
      });
      return res.status(201).json({
        message: "Mentorship request sent successfully",
        mentorship: newMentorship,
      });
    } catch (error) {
      console.error("Error connecting to mentor:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};
  
const acceptMentorship = async (req, res) => {
    try {
      const { mentorshipId } = req.body; 
      const mentorship = await prisma.mentorship.findUnique({
        where: { id: mentorshipId },
        include: { mentor: true }, 
      });
  
      if (!mentorship) {
        return res.status(404).json({ message: "Mentorship request not found" });
      }
  
      if (mentorship.status !== "PENDING") {
        return res.status(400).json({ message: "Mentorship is not in a pending state" });
      }
  
      if (mentorship.mentor.currentMentees >= mentorship.mentor.maxMentees) {
        return res.status(400).json({ message: "This mentor has reached their maximum mentee limit" });
      }
  
      const updatedMentorship = await prisma.mentorship.update({
        where: { id: mentorshipId },
        data: {
          status: "ACTIVE", // Update status to ACTIVE
          mentor: {
            update: {
              currentMentees: { increment: 1 }, // Increment current mentees count
            },
          },
        },
      });
  
      return res.status(200).json({
        message: "Mentorship request accepted successfully",
        mentorship: updatedMentorship,
      });
    } catch (error) {
      console.error("Error accepting mentorship:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

module.exports ={
    getAllMentors,
    connectToMentor,
    acceptMentorship,
}
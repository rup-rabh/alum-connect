const prisma = require("../utils/prismaClient")
const {isAlumWithBasicProfile} = require('../middleware/alumniMiddleware')
const {isStudentWithBasicProfile} = require('../middleware/studentMiddleware')

const roleSpeceficMiddleware = async (req, res, next) => {   //both alum and students can be mentor

  try{
    if (req.role === "ALUMNI") {
      return isAlumWithBasicProfile(req, res, next);
    } else if (req.role === "STUDENT") {
      return isStudentWithBasicProfile(req, res, next);
    } else {
      return res.status(403).json({ error: "Unauthorized access" });
    }

  }
  catch(error){
    console.error("Error in roleSpecefic middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
    
}

const isMentor = async (req,res,next) =>{

  try{
    const profile = await prisma.mentor.findUnique({
      where: { userId: req.userId },
    });
    if (!profile) {
      return res.status(403).json({
        message:
          "Profile incomplete. Please complete your profile before proceeding.",
      });
    }
    req.mentorId = profile.id;
  
    next();

  }
  catch(error){
    console.error("Error in isMentor middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

}

module.exports = {roleSpeceficMiddleware,isMentor}
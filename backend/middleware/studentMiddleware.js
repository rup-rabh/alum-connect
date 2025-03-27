const prisma=require("../utils/prismaClient")

const isStudent = async (req, res, next) => {

  
    try {
      if (req.role !== "STUDENT") {
        return res.status(403).json({
            message: "Access denied. Only students can perform this action.",
          });
      }
  
      next();
    } catch (error) {
      console.error("Error in isStudent middleware:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  const isStudentWithBasicProfile = async (req, res, next) => {
    try {
      if (req.role !== "STUDENT") {
        return res.status(403)
          .json({
            message: "Access denied. Only students can perform this action.",
          });
      }
      // check whether user has filled his profile or not
      const profile = await prisma.student.findUnique({
        where: { userId: req.userId },
      });
  
      if (!profile) {
        return res.status(403).json({
          message:
            "Profile incomplete. Please complete your profile before proceeding.",
        });
      }
      req.studentId = profile.id;
  
      next();
    } catch (error) {
      console.error("Error in isAlumni middleware:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports={isStudent,isStudentWithBasicProfile}
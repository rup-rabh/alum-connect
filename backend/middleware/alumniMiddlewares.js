const { PrismaClient, Domain } = require("@prisma/client");
const prisma = new PrismaClient();

const isAlumni = async (req, res, next) => {
  try {
    if (req.role !== "ALUMNI") {
      return res.status(403).json({
          message: "Access denied. Only alumni can perform this action.",
        });
    }

    next();
  } catch (error) {
    console.error("Error in isAlumni middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const isAlumWithProfile = async (req, res, next) => {
  try {
    if (req.role !== "ALUMNI") {
      return res.status(403)
        .json({
          message: "Access denied. Only alumni can perform this action.",
        });
    }
    // check whether user has filled his profile or not
    const profile = await prisma.alumni.findUnique({
      where: { userId: req.userId },
    });

    if (!profile) {
      return res.status(403).json({
        message:
          "Profile incomplete. Please complete your profile before proceeding.",
      });
    }
    req.alumniId = profile.id;

    next();
  } catch (error) {
    console.error("Error in isAlumni middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {isAlumni, isAlumWithProfile};

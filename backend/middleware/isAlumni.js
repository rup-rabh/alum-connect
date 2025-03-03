import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const isAlumni = async (req, res, next) => {
  try {
    if (req.role !== "ALUMNI") {
      return res.status(403).json({ message: "Access denied. Only alumni can perform this action." });
    }

    // Fetch the Alumni profile linked to this User
    const alumni = await prisma.alumni.findUnique({
      where: { userId: req.userId },
    });

    if (!alumni) {
      return res.status(403).json({ message: "Only verified alumni can perform this action." });
    }
    req.alumniId = alumni.id;

    next();
  } catch (error) {
    console.error("Error in isAlumni middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAlumni;

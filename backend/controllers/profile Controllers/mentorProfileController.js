const prisma = require("../../utils/prismaClient");
const {MentorSchema,MentorshipSchema} = require("../zodSchemas/mentorModel")

const addProfile = async (req, res) => {
  req.body.userId = req.userId;
  const profile = MentorSchema.safeParse(req.body);
  if (!profile.success) {
    const errors = profile.error.errors.map((error) => ({
      message: error.message,
      path: error.path,
    }));
    return res.status(403).json({ message: "Zod validation errors.", errors });
  }

  const existingMentor = await prisma.mentor.findUnique({
    where: { userId: req.userId },
  });

  if (existingMentor) {
    return res.status(400).json({
      message:
        "Mentor Profile exists already. You can update your details.",
    });
  }

  const mentor = await prisma.mentor.create({
    data: { ...profile.data, userId: req.userId },
  });

  return res
    .status(201)
    .json({ message: "Mentor profile completed successfully.", mentor });
};



const getProfile = async (req, res) => {
  try {
    const basicProfile = await prisma.mentor.findUnique({
      where: { id: req.mentorId },
    });

    if (!basicProfile) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({basicProfile});
  } catch (error) {
    res.status(500).json({ message: "Error retrieving student profile", error });
  }
};


module.exports = {
  addProfile,
  getProfile,
};

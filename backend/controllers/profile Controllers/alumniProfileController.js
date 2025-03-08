require("dotenv").config({ path: "../.env" });
const prisma = require("../../utils/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const {MentorSchema,MentorshipSchema} = require("../zodSchemas/mentorModel")
const basicProfileSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  presentCompany: z.string().min(1, { message: "Company name is required." }),
  yearsOfExperience: z
    .number()
    .min(0, { message: "Invalid years of experience." }),
  domain: z.enum(
    [
      "SOFTWARE",
      "FRONTEND",
      "BACKEND",
      "PRODUCT_MANAGEMENT",
      "WEB_DEVELOPMENT",
      "MOBILE_DEVELOPMENT",
      "MACHINE_LEARNING",
      "DATA_SCIENCE",
      "BLOCKCHAIN",
      "CLOUD_COMPUTING",
      "CYBERSECURITY",
    ],
    { message: "Invalid domain selected." }
  ),
});

const experienceSchema = z.object({
  company: z.string().min(1, { message: "Company name cannot be empty." }),
  role: z.string().min(1,{message:"Role cannot be empty."}),
  startDate: z.union([z.string().datetime(), z.null()]).optional(),
  endDate: z.union([z.string().datetime(), z.null()]).optional(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
});

const experiencesSchema = z.array(experienceSchema).min(1, {
  message: "At least one experience is required.",
});

const addBasicProfile = async (req, res) => {
  const profile = basicProfileSchema.safeParse(req.body);
  if (!profile.success) {
    const errors = profile.error.errors.map((error) => ({
      message: error.message,
      path: error.path,
    }));
    return res
      .status(403)
      .json({ message: "Zod validation errors.", errors });
  }

  const existingAlumni = await prisma.alumni.findUnique({
    where: { userId: req.userId },
  });

  if (existingAlumni) {
    return res.status(400).json({
      message:
        "Profile already exists. You have already completed your alumni registration. You can update your details.",
    });
  }

  const alumni = await prisma.alumni.create({
    data: { ...profile.data, userId: req.userId },
  });

  return res
    .status(201)
    .json({ message: "Alumni profile completed successfully.", alumni });
};

const addExperience = async (req, res) => {
  const alumniId = req.alumniId;
  const experiences = experiencesSchema.safeParse(req.body);

  if (!experiences.success) {
    const errors = experiences.error.errors.map((error) => ({
      message: error.message,
      path: error.path,
    }));
    return res
      .status(403)
      .json({ message: "Zod validation errors.", errors });
  }

  const experincesdata = experiences.data.map((exp) => {
    return {
      ...exp,
      alumniId,
    };
  });

  await prisma.alumniExperience.createMany({
    data: experincesdata,
  });

  return res
    .status(200)
    .json({ message: "Successfully added past experinces to the alumni." });
};

const getBasicProfile = async (req, res) => {
  const basicProfile = await prisma.alumni.findUnique({
    where: { id: req.alumniId },
  });
  return res.status(201).json({ basicProfile });
};

const getExperience = async (req, res) => {
  const pastExperiences = await prisma.alumniExperience.findMany({
    where: { alumniId: req.alumniId },
  });
  return res.status(201).json({ pastExperiences });
};

const addMentorProfile = async (req, res) => {
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



const getMentorProfile = async (req, res) => {
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
  addBasicProfile,
  addExperience,
  getBasicProfile,
  getExperience,
  getMentorProfile,
  addMentorProfile
};

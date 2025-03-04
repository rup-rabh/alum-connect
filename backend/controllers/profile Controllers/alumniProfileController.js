require("dotenv").config({ path: "../.env" });
const prisma = require("../utils/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

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
  role: z.string(),
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
    return res
      .status(403)
      .json({ message: "Zod validation error for profile completion." });
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
    return res
      .status(403)
      .json({ message: "Zod validation error for adding experiences." });
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

module.exports = {
  addBasicProfile,
  addExperience,
  getBasicProfile,
  getExperience,
};

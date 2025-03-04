require("dotenv").config({ path: "../.env" });
const { PrismaClient, Domain } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z, string } = require("zod");
const axios = require("axios");

const prisma = new PrismaClient();

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

const experienceSchema=z.object({
  company: z.string().min(1, { message: "Company name cannot be empty." }),
  role: z.string(),
  startDate:z.union([z.string().datetime(), z.null()]).optional(),
  endDate  :z.union([z.string().datetime(), z.null()]).optional(),
  description:  z.string().min(1, { message: "Description cannot be empty." })
})

const experiencesSchema=z.array(experienceSchema).min(1, {
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

const addExperience=async (req,res)=>{
  const alumniId=req.alumniId;
  const experiences=experiencesSchema.safeParse(req.body)

  if (!experiences.success) {
    return res
      .status(403)
      .json({ message: "Zod validation error for adding experiences." });
  }

  const experincesdata=experiences.data.map((exp)=>{
    return {
      ...exp,
      alumniId
    }
  })

  await prisma.alumniExperience.createMany({
    data:experincesdata
  })

  return res.status(200).json({message:"Successfully added past experinces to the alumni."})
}


const getBasicProfile=async(req,res)=>{
  const basicProfile=await prisma.alumni.findUnique({
    where:{id:req.alumniId}
  })
  return res.status(201).json({basicProfile})
}

const getExperience=async(req,res)=>{
  const pastExperiences=await prisma.alumniExperience.findMany({
    where:{alumniId:req.alumniId}
  })
  return res.status(201).json({pastExperiences})
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Time set to 00:00:00
};

const postInternship = async (req, res) => {
  // Check the role of the user

  // const startTimeString = "2025-06-01T00:00:00.000Z";  //these are strings
  // const endTimeString = "2025-09-01T00:00:00.000Z";

  // const startTime = new Date(startTimeString); //since prisma excepts a DateTime i.e Date object not a string
  // const endTime = new Date(endTimeString);

  // console.log(startTime); // Output: Sun Jun 01 2025 00:00:00 GMT+0000 (UTC)  //DateTime objects
  // console.log(endTime);   // Output: Mon Sep 01 2025 00:00:00 GMT+0000 (UTC)

  const internshipData = {
    ...req.body,
    domain: req.body.domain.toUpperCase(),
    startTime: formatDate(req.body.startTime),
    endTime: formatDate(req.body.endTime),
    postedById: req.alumniId,
  };

  const new_internship = await prisma.internship.create({
    data: internshipData,
  });

  return res.status(201).json({
    message: "Internship posted successfully",
    new_internship,
  });
};

const getInternPostsById = async (req, res) => {
  const alumniId = req.alumniId;

  const user = await prisma.alumni.findUnique({
    where: { id: alumniId },
  });

  const internships = await prisma.internship.findMany({
    where: { postedById: alumniId },
  });

  return res.status(200).json({ internships });
};

const closeInternship = async (req, res) => {
  try {
    const internshipId = parseInt(req.params.id);
    const alumniId = req.alumniId;

    const internship = await prisma.internship.findUnique({
      where: { id: internshipId },
    });

    if (!internship)
      return res.status(404).json({ message: "Internship not found" });

    if (internship.postedById !== alumniId) {
      return res.status(403).json({
        message: "You are not authorized to close this internship",
      });
    }

    await prisma.internship.update({
      where: { id: internship.id },
      data: { closed: true },
    });

    return res.status(200).json({ message: "Internship closed successfully" });
  } catch (error) {
    console.error("Error closing internship:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateInternship = async (req, res) => {
  try {
    const internshipId = parseInt(req.params.id);
    const alumniId = req.alumniId;

    const internship = await prisma.internship.findUnique({
      where: { id: internshipId },
    });

    if (!internship)
      return res.status(404).json({ message: "Internship not found" });

    if (internship.postedById !== alumniId) {
      return res.status(403).json({
        message: "You are not authorized to update this internship",
      });
    }

    const internshipData = {
      ...req.body,
      domain: req.body.domain.toUpperCase(),
      startTime: formatDate(req.body.startTime),
      endTime: formatDate(req.body.endTime),
      postedById: alumniId,
    };

    await prisma.internship.update({
      where: { id: internshipId },
      data: internshipData,
    });

    return res.status(200).json({ message: "Internship updated successfully" });
  } catch (error) {
    console.error("Error updating internship:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  addBasicProfile,
  addExperience,
  getBasicProfile,
  getExperience,
  postInternship,
  closeInternship,
  updateInternship,
  getInternPostsById,
};

require("dotenv").config({ path: "../.env" });
const { PrismaClient, Domain } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const axios = require("axios");

const prisma = new PrismaClient();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Time set to 00:00:00
};

const getAllInternships = async (req, res) => {
  try {
    const studentId = req.studentId; 

    const internships = await prisma.internship.findMany({
      where:{
        closed:false
      },
      include: {
        applications: {
          where: { studentId },
          select: { status: true }, 
        },
      },
    });

    const formattedInternships = internships.map(({applications, ...internship}) => ({
      ...internship,
      applicationStatus: applications.length > 0 
        ? applications[0].status 
        : null, 
    }));

    return res.status(200).json({ internships: formattedInternships });
  } catch (error) {
    console.error("Error fetching internships:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const applyInternship=async (req,res)=>{
    const internshipId=parseInt(req.params.id);
    const studentId=req.studentId;

    const internshipApplication=await prisma.internApplication.create({
      data:{
        studentId,
        internshipId
      }
    })

    return res.status(201).json({message:"Successfully applied to the internship."})
}

const getAppliedInternships=async (req,res)=>{
  const studentId=req.studentId;

  const appliedInternships=await prisma.internApplication.findMany({
    studentId
  })

  return res.status(201).json({appliedInternships})
}

const getAcceptedInternships=async(req,res)=>{
  const studentId=req.studentId;

  const accepedInternships=await prisma.internApplication.findMany({
    where:{studentId,status:"ACCEPTED"}
  })

  return res.status(201).json({accepedInternships});
}

const getRejectedInternships=async(req,res)=>{
  const studentId=req.studentId;

  const rejectedInternships=await prisma.internApplication.findMany({
    where:{studentId,status:"REJECTED"}
  })

  return res.status(201).json({rejectedInternships});
}
const getAllMentors = async (req,res)=>{
  try {
      const mentors = await prisma.mentor.findMany({
        include: {
          user: {
            include: {
              alumni: {
                select: {
                  fullName: true, // Fetch only the name from Alumni
                },
              },
            },
          },
        },
      });
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
        status: "PENDING", // Default status for new requests
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

module.exports={
  getAllInternships,
  applyInternship,
  getAppliedInternships,
  getAcceptedInternships,
  getRejectedInternships,
  getAllMentors,
  connectToMentor,
}
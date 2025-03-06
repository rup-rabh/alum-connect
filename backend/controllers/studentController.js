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

const getAllInternships=async (req,res)=>{
    const internships=await prisma.internship.findMany({})
    return res.status(200).json({internships})
}

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

module.exports={getAllInternships,applyInternship,getAppliedInternships,getAcceptedInternships,getRejectedInternships}
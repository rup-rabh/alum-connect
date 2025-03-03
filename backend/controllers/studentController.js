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

const applyInternships=async (req,res)=>{
    
}

const getAppliedInternships=async (req,res)=>{

}

module.exports={getAllInternships,applyInternships,getAppliedInternships}
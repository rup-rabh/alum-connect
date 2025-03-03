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
  postInternship,
  closeInternship,
  updateInternship,
  getInternPostsById,
};

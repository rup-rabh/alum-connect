require('dotenv').config({path:'../.env'});
const prisma= require("../utils/prismaClient")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const axios = require('axios');

const getUserInfo = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.userId,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      return res.status(200).json({ user }); 
    } catch (error) {
      console.error("Error fetching user info:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };  

module.exports={getUserInfo}
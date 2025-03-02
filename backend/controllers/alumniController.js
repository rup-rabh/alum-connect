require('dotenv').config({path:'../.env'});
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const axios = require('axios');

const prisma = new PrismaClient();

const alum_internship=()=>{

}

module.exports={alum_internship}
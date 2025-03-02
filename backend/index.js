const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const authRoutes = require("./routes/authRoutes");
const alumniRoutes= require("./routes/alumniRoutes");
const userRoutes= require("./routes/userRoutes")

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes)
app.use("/api/alumni",alumniRoutes)


app.listen(PORT, () => console.log(`Server listening on port:${PORT}`));
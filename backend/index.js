require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server listening on port:${PORT}`));

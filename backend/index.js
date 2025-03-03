const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const authRoutes = require("./routes/authRoutes");
const userRoutes= require("./routes/userRoutes");
const alumniRoutes= require("./routes/alumniRoutes");
const studentRoutes=require("./routes/studentRoutes");

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
app.use("/api/student",studentRoutes)


app.listen(PORT, () => console.log(`Server listening on port:${PORT}`));
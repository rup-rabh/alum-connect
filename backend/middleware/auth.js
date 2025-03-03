const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const authenticationToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //{userId:22, iat:491321}

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true }, // Select only necessary fields
    });

    if (!user)
      return res.status(404).json({ message: "User not found. Invalid token" });

    req.userId = user.id;
    req.role = user.role;
    req.user=user

    next();
  } catch (err) {
    console.error("Authentication Error:", err.message);
    return res.status(403).json({ message: "User Authentication failed." });
  }
};

module.exports = authenticationToken;

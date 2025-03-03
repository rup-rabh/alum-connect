const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = user.userId;
    req.role = user.role; 
    next();
  });
};

module.exports = authenticationToken;

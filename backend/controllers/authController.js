const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const prisma = new PrismaClient();

// Zod Schema for sign-up Validation
const signUpSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z.string().min(1, { message: "Password cannot be empty!" }),
});

// Sign-in User Function
const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password." }); // Unauthorized error if passwords don't match
    }

    // Generate a JWT token with the user's ID and respond with status code 200
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Sign-in successful.",
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { signinUser };

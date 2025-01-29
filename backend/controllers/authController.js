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

const signupUser = async (req, res) => {
  try {
    // Validate the request body wrt schema
    const validatedData = signUpSchema.parse(req.body);
    
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await prisma.user.create({
      data: {
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation failed.", errors: error.errors });
    }
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

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

module.exports = { signinUser,signupUser };

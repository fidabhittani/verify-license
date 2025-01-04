const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assuming your User model is in the models directory
const { JWT_SECRET, tokenKey } = require("../utils");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// Route: Signup
router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastName, username, password, email, roles } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstname,
      lastName,
      username,
      password: hashedPassword,
      email,
      roles: roles || ["user"],
      active: false,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by usernamess
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userInfo = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastName: user.lastName,
      roles: user.roles,
      active: user.active,

    }

    // Generate a JWT
    const token = jwt.sign(
      { ...userInfo },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set token in HTTP-only cookie
    res.cookie(tokenKey, token, {
      httpOnly: true, // Cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production (requires HTTPS)
      maxAge: 3600000, // 1 hour
      sameSite: "Strict", // Prevents cross-site cookie leakage
    });

    res.status(200).json({
      message: "Login successful",
      user: userInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Logout route
router.post("/logout", authenticate, (req, res) => {
  res.clearCookie(tokenKey, { 
    httpOnly: true, 
    sameSite: "strict", 
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production (requires HTTPS)
  }); // Clear the cookie

  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // User model path
const authenticate = require("../middleware/authenticate"); // Middleware for token authentication
const { JWT_SECRET, tokenKey } = require("../utils");
const router = express.Router();

// Route: Verify Token
router.get("/verify", (req, res) => {
  const token = req.cookies[tokenKey]; // Get token from cookies

  if (!token) {
    return res
      .status(401)
      .json({ valid: false, message: "Token missing or invalid" });
  }

  try {
    const decodedJwt = jwt.verify(token, JWT_SECRET);

    return res
      .status(200)
      .json({ valid: true, message: "Token is valid", user: decodedJwt });
  } catch (error) {
    return res
      .status(401)
      .json({ valid: false, message: "Invalid or expired token" });
  }
});

// Route: Get All Users
router.get("/", authenticate, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Get User by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Create User
router.post("/", authenticate, async (req, res) => {
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

    const newUser = new User({
      firstname,
      lastName,
      username,
      password: hashedPassword,
      email,
      roles: roles || ["user"],
      active: true,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Update User by ID
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { firstname, lastName, username, email, roles, active } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.firstname = firstname || user.firstname;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.roles = roles || user.roles;
    user.active = active !== undefined ? active : user.active;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Delete User by ID
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

const jwt = require("jsonwebtoken");
const { JWT_SECRET, tokenKey } = require("../utils");

const authenticate = (req, res, next) => {
  const token = req.cookies[tokenKey]; // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticate;

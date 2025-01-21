// backend/utils/authUtils.js

const jwt = require("jsonwebtoken");

// Middleware to verify the token
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token)
    return res.status(401).json({ message: "Unauthorized, no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

// Middleware to check admin privileges
const admin = (req, res, next) => {
  if (!req.user?.isAdmin)
    return res.status(403).json({ message: "Access denied, admin only" });
  next();
};

module.exports = { protect, admin };

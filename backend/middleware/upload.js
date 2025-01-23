// backend/middleware/upload.js

const multer = require("multer");
const { storage } = require("../utils/cloudinary");

// Set up Multer with Cloudinary storage
const upload = multer({ storage });

module.exports = upload;

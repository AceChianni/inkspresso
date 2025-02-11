// backend/utils/cloundinary.js

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Inkspresso",
    allowed_formats: ["jpeg", "jpg", "png"],
    use_filename: true,
    unique_filename: true,
  },
});

module.exports = { cloudinary, storage };

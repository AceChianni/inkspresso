// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server only after successful DB connection
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );

// Test Route
app.get("/", (req, res) => res.send("Inkspresso API is running"));
// Use authentication routes
app.use("/api/auth", authRoutes);

// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );

// Use the auth routes (login and registration)
app.use("/api/auth", authRoutes);

// Use the product routes
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => res.send("Inkspresso API is running"));

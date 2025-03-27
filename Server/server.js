const path = require("path");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./database/db");
const todoRoutes = require("./routes/todoRoute");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: "https://todo-list-bc1t.onrender.com", // Frontend URL
    credentials: true, // Enables cookies for authentication
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/users", authRoutes);
app.use("/todos", todoRoutes);

// Serve Frontend from "Client/dist"
app.use(express.static(path.join(__dirname, "../Client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist", "index.html"));
});

// Connect to MongoDB and Start Server
connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log("Database connection failed:", err));

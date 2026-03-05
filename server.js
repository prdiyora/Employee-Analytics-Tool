const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const employeeRoutes = require("./backend/routes/employeeRoutes");

const app = express(); 

app.use(cors());
app.use(express.json());

// Serve static files from the 'public', 'css', and 'js' directories
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

// API Routes
app.use("/api/employees", employeeRoutes);

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


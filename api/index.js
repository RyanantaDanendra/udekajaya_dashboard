// api/index.js

const express = require("express");
const path = require("path");
// Import your backend Express app
const apiApp = require("../backend/server");

const app = express();

// 1. Route /api/* requests to your actual backend logic
app.use("/api", apiApp);

// 2. Serve static files from the correct build directory
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(frontendBuildPath));

// 3. SPA Fallback: Send index.html for all other unmatched routes (like /login)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Export the Express app for Vercel
module.exports = app;

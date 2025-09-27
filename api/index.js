// const app = require("../backend/server");
// const serverless = require("serverless-http");

// module.exports = serverless(app);

// api/index.js

// This function acts as a wrapper to redirect the request to the correct Express app
// and also serves the static file if it's not an API call.

const express = require("express");
const path = require("path");

// Assuming your backend logic is in backend/server.js
// You might need to adjust this to import your existing Express app if it's exported.
const apiApp = require("../backend/server");

// Create a new Express instance for Vercel
const app = express();

// 1. Route API requests to your backend application
app.use("/api", apiApp);

// 2. Serve static files from the frontend/build directory
// This is the CRITICAL STEP to fix the 404
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(frontendBuildPath));

// 3. SPA Fallback: For all other requests (like /login), send index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

module.exports = app;

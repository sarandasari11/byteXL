const express = require("express");
const app = express();
const PORT = 3000;

// Logger Middleware
const logger = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};

app.use(logger);

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header missing or incorrect",
    });
  }

  const token = authHeader.split(" ")[1];
  if (token !== "mysecrettoken") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  next();
};

// Public Route
app.get("/public", (req, res) => {
  res.status(200).send("This is a public route. No authentication required.");
});

// Protected Route
app.get("/protected", authMiddleware, (req, res) => {
  res
    .status(200)
    .send("You have accessed a protected route with a valid Bearer token!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

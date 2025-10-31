const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// --------------------- CONFIG ---------------------
const JWT_SECRET = "mysecretkey";

// Hardcoded demo users
const users = [
  { id: 1, username: "adminuser", password: "admin123", role: "Admin" },
  { id: 2, username: "moderatoruser", password: "mod123", role: "Moderator" },
  { id: 3, username: "normaluser", password: "user123", role: "User" },
];

// --------------------- LOGIN ROUTE ---------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!foundUser) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT with role embedded
  const token = jwt.sign(
    {
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
  });
});

// --------------------- VERIFY TOKEN MIDDLEWARE ---------------------
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
}

// --------------------- ROLE CHECK MIDDLEWARE ---------------------
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

// --------------------- PROTECTED ROUTES ---------------------

// Admin-only route
app.get("/admin-dashboard", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({
    message: "Welcome to the Admin dashboard",
    user: req.user,
  });
});

// Moderator-only route
app.get("/moderator-panel", verifyToken, authorizeRoles("Moderator", "Admin"), (req, res) => {
  res.json({
    message: "Welcome to the Moderator panel",
    user: req.user,
  });
});

// User route (all logged-in users)
app.get("/user-profile", verifyToken, (req, res) => {
  res.json({
    message: `Welcome to your profile, ${req.user.username}`,
    username: req.user.username,
    role: req.user.role,
  });
});

// --------------------- SERVER START ---------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

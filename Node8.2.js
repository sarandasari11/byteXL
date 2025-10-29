const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Hardcoded user (for demo)
const user = {
  id: 1,
  username: "testuser",
  password: "password123",
};

// Secret key for JWT signing (keep it safe in real apps)
const JWT_SECRET = "mysecretkey";

// --------------------- LOGIN ROUTE ---------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  if (username === user.username && password === user.password) {
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" } // Token valid for 1 hour
    );

    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// --------------------- MIDDLEWARE ---------------------
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Attach decoded user info
    next();
  });
}

// --------------------- PROTECTED ROUTE ---------------------
app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

// --------------------- SERVER SETUP ---------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

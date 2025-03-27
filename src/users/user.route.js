const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken"); //npm i jsonwebtoken

const router = express.Router();

// 1- node
// 2- require('crypto').randomBytes(64).toString('hex')
const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username });

    // Check if the admin exists
    if (!admin) {
      return res.status(404).send({ message: `Admin not found!` });
    }

    // Check if the password matches
    if (admin.password !== password) {
      return res.status(404).send({ message: "Invalid password!" });
    }

    // Generate JWT token if authentication is successful
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with token and user data
    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Failed to login as admin", error);

    // Ensure that we only send one response
    if (!res.headersSent) {
      return res.status(401).send({ message: "Failed to login as admin" });
    }
  }
});

module.exports = router;

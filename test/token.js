// testToken.js
const generateToken = require("../utils/generateToken");

// Simulated user ID (can be any string)
const userId = "testUserId123";

// Generate token
const token = generateToken(userId);

// Print token to console
console.log("Generated JWT Token:\n", userId , token);
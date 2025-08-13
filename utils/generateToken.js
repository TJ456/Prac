// 🎯 LEARNING OBJECTIVE: Master JWT authentication, token security, and session management

// ✅ STEP 1: Import jsonwebtoken library
// Why: JWT (JSON Web Token) is a secure way to transmit information between parties
// It's stateless, meaning server doesn't need to store session data
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); // for loading the envs

// ✅ STEP 2: Create generateToken function that accepts userId
// Why: Token will contain user ID to identify who is making requests
// This function will be called after successful login/registration

// JWT Structure Understanding:
// - Header: Contains algorithm and token type
// - Payload: Contains user data (userId) - don't put sensitive data here!
// - Signature: Verifies token hasn't been tampered with

const generateToken = (userId) => {
  return jwt.sign(
    { userId }, // payload

    process.env.JWT_SECRET, // secret

    // ✅ STEP 3: Configure JWT options for security
    // Required options:
    // - expiresIn: '30d' (token expires in 30 days for better UX)
    // - algorithm: 'HS256' (HMAC SHA256 - most common)
    {
      expiresIn: '30d',
    }
  );
};

// ✅ STEP 4: Export the generateToken function
// Why: Controllers will import this to generate tokens for users
module.exports = generateToken;


// 🔒 SECURITY BEST PRACTICES:
// - Use strong JWT_SECRET (minimum 32 characters, random)
// - Set reasonable expiration time (not too long, not too short)
// - Never put sensitive data in JWT payload (it's base64, not encrypted)
// - Store JWT_SECRET in environment variables, never in code
// - Consider refresh tokens for better security in production

// 💡 PRO TIPS:
// - Shorter expiration = more secure but worse UX
// - Can include user role in payload for authorization
// - Frontend should store JWT in localStorage or httpOnly cookies
// - Add issued at (iat) claim to track when token was created

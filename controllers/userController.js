// 🎯 LEARNING OBJECTIVE: Master authentication flow, password security, and API response patterns

// ✅ STEP 1: Import required modules
// - User model: For database operations
const User = require('../models/userModel');
// - bcryptjs: For password hashing and comparison
const bcrypt = require('bcrypt.js');
// - generateToken: Custom utility for JWT creation
const generateToken = require('../utils/generateToken');
// Why: Controllers handle business logic and coordinate between models and routes


// ✅ STEP 2: Create registerUser async function
// Why: Registration creates new user accounts with secure password storage

// Registration Logic Flow:
// 2a. Extract name, email, password from req.body
// 2b. Validate input data (check if all required fields exist)
// 2c. Check if user already exists with this email (User.findOne({ email }))
// 2d. If user exists, return 400 "User already exists"
// 2e. Hash password using bcrypt.hash(password, saltRounds) - use 12 salt rounds
// 2f. Create new user with User.create({ name, email, password: hashedPassword })
// 2g. If successful, generate JWT token and return user data (without password)
// 2h. Response format: { _id, name, email, token }

const registerUser = async (req, res) => {
  try {
    // ✅ STEP 2a: Extract data
    const { name, email, password } = req.body;

    // ✅ STEP 2b: Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ STEP 2c: Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ STEP 2e: Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ STEP 2f: Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ STEP 2g + 2h: Send response with token (without password)
    if (user) {
      const token = generateToken(user._id); // use user._id

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json({ message: "User creation failed" });
    }

  } catch (error) {
    console.error("register error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ STEP 3: Create loginUser async function  
// Why: Login authenticates existing users and provides access tokens

// Login Logic Flow:
// 3a. Extract email and password from req.body
// 3b. Validate input (both email and password required)
// 3c. Find user by email (User.findOne({ email }))
// 3d. If no user found, return 401 "Invalid credentials"
// 3e. Compare password using bcrypt.compare(password, user.password)
// 3f. If password doesn't match, return 401 "Invalid credentials"
// 3g. If credentials valid, generate JWT token
// 3h. Return user data with token: { _id, name, email, token }
const loginUser = async(res , req)=>
{ try{
    const {email , password} = req.body;
    if (!email || !password){
        res.status(400).json({message:"all requires required"}); 
    }
    const user = await User.findOne({email});
    if (!user){
        res.status(401).json({message:"Invalid credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch){
        res.status(401).json({message:"Invalid credentials"});
    }
    
        const token = await generateToken(user._id);
        res.status(201)({
         name: user.name,
         _id : user._id,
         email: user.email,
         token : token,
        });
}
     
catch (error) {
    console.error("register error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// ✅ STEP 4: Add proper error handling with try-catch
// Why: Database operations and bcrypt can throw errors
// - Wrap each function in try-catch
// - Return 500 "Server error" for unexpected errors
// - Log actual errors to console for debugging

// ✅ STEP 5: Export both controller functions
// Why: Routes will import these functions to handle authentication endpoints
module.exports = { registerUser, loginUser};
// 🔒 SECURITY BEST PRACTICES:
// - Never store plain text passwords
// - Use high salt rounds for bcrypt (12+ for production)
// - Don't return passwords in API responses
// - Use same error message for "user not found" and "wrong password" (prevents email enumeration)
// - Validate and sanitize all input data
// - Consider rate limiting for auth endpoints

// 📊 HTTP STATUS CODES TO USE:
// - 200: Successful login/registration
// - 400: Bad request (missing fields, user already exists)
// - 401: Unauthorized (invalid credentials)
// - 500: Server error (database issues, bcrypt errors)

// 💡 PRO TIPS:
// - Consider email verification for registration
// - Add password strength validation
// - Implement account lockout after failed attempts
// - Log authentication events for security monitoring
// - Consider OAuth integration (Google, GitHub) for better UX

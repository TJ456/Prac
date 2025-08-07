// 🎯 LEARNING OBJECTIVE: Master Express middleware, JWT verification, and route protection

// ✅ STEP 1: Import jsonwebtoken and User model
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
// Why: Need jwt to verify tokens and User model to get user details
// Middleware runs between request and response to validate authentication

// ✅ STEP 2: Create protect middleware function (req, res, next)
// Why: Middleware functions have access to request and response objects
// next() is called to pass control to next middleware or route handler
const protect = async(req ,res , next)=>{
// ✅ STEP 3: Extract token from Authorization header
// Token format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
// Steps:
// - Check if req.headers.authorization exists
// - Check if it starts with 'Bearer '
// - Extract token using .startsWith() and .slice(7) or .split(' ')[1]
// - If no token found, return 401 Unauthorized error
let token;    
try{
        if(req.headers.autorization && 
            req.headers.autorization.startswith("Bearer")
        ){
            token =req.headers.autorization.slice(7);
            const decoded = jwt.verify(token,process.env.JWT_secret)
            req.user = await user.findById(decoded.id).select("-password");
           next();
        }
      else{
        res.status(401).json({message: "NOt autho,no token"});
      }
    }
    catch(error){
        console.log("Token verificaion failed",error);
    }
};
// ✅ STEP 4: Verify token and decode payload
// Use try-catch block:
// - jwt.verify(token, process.env.JWT_SECRET) returns decoded payload
// - Payload contains userId we stored when creating token
// - If verification fails, catch error and return 401 Unauthorized

// ✅ STEP 5: Get user from database and attach to request
// Steps:
// - Use User.findById(decoded.userId).select('-password')
// - .select('-password') excludes password from returned user object
// - Check if user exists (user might have been deleted)
// - Attach user to req.user so route handlers can access it
// - Call next() to proceed to the actual route handler

// ✅ STEP 6: Handle errors properly
// Common scenarios:
// - No authorization header: 401 "Not authorized, no token"
// - Invalid token format: 401 "Not authorized, token failed"
// - Token expired: 401 "Not authorized, token failed"
// - User not found: 401 "Not authorized, user not found"

// ✅ STEP 7: Export the protect middleware
// Why: Route files will import this to protect specific routes
module.exports = {protect};
// 🔒 MIDDLEWARE FLOW UNDERSTANDING:
// Client Request → protect middleware → Route Handler → Response
// If middleware calls next(), request continues to route handler
// If middleware sends response, request stops there

// 💡 PRO TIPS:
// - Always use try-catch with JWT operations
// - Don't send sensitive error details to client
// - Consider rate limiting to prevent brute force attacks
// - Log authentication attempts for security monitoring
// - Can extend this for role-based authorization (admin, user, etc.)

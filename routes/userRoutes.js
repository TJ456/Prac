// 🎯 LEARNING OBJECTIVE: Master Express routing, HTTP methods, and API endpoint design

// ✅ STEP 1: Import express router and userController
// Why: Router creates modular route handlers that can be mounted in main app
// Controllers contain the actual business logic, routes just define endpoints
const express = require ("express");
const {registerUser, loginUser} = require("../controllers/userController");
// ✅ STEP 2: Create router instance
// const router = express.Router()
// Why: Router allows us to create route handlers that can be exported and used in app.js
const router = express.Router();

// ✅ STEP 3: Define authentication routes with proper HTTP methods
// Why: RESTful API design uses appropriate HTTP methods for different operations

// Route Definitions:
// POST /api/users/register - Create new user account
// - HTTP Method: POST (creating new resource)
// - Path: /register 
// - Handler: userController.registerUser
// - Body: { name, email, password }
// - Response: { _id, name, email, token }
router.post('/register',registerUser);
// POST /api/users/login - Authenticate existing user
// - HTTP Method: POST (not GET because we're sending credentials in body)
// - Path: /login
// - Handler: userController.loginUser  
// - Body: { email, password }
// - Response: { _id, name, email, token }
router.post('/login'/loginUser);
// ✅ STEP 4: Export the router
// Why: app.js will import this router and mount it at /api/users
module.exports = router ;
// 🌐 API ENDPOINT STRUCTURE:
// Full URLs will be:
// - POST http://localhost:5000/api/users/register
// - POST http://localhost:5000/api/users/login

// 📝 RESTful CONVENTIONS:
// - Use POST for creating resources (register) and authentication (login)
// - Use descriptive path names (/register, /login)
// - Group related routes under same base path (/api/users)
// - Return consistent response formats

// 💡 PRO TIPS:
// - Consider adding input validation middleware before controllers
// - Add rate limiting middleware for auth routes
// - Could add GET /profile route for getting current user info
// - Could add PUT /profile route for updating user profile
// - Could add POST /logout route to blacklist tokens

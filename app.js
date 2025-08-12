// 🎯 LEARNING OBJECTIVE: Master Express app setup, middleware configuration, and server architecture

// ✅ STEP 1: Import all required modules
// Why: Main app file coordinates all components of the application
// Required imports:
// - express: Web framework for creating the server
// - dotenv: Load environment variables from .env file
// - cors: Enable cross-origin requests (for frontend communication)
// - connectDB: Custom function to connect to MongoDB
// - userRoutes: Authentication-related routes
// - taskRoutes: Task management routes
const express = require ("express");
const dotenv = require ("dotenv");
const cors = require ("cors");
const connectDB = require ("./config/db");
const userRoutes =  require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
// ✅ STEP 2: Initialize Express application
// const app = express()
// Why: Creates Express application instance that will handle all HTTP requests
const app = express();
// ✅ STEP 3: Load environment variables and connect to database
// Why: Must load .env variables before using them and establish DB connection before starting server
// Steps:
// 3a. Call dotenv.config() to load environment variables
// 3b. Call connectDB() to establish MongoDB connection
// 3c. Handle any connection errors appropriately
dotenv.config();
connectDB();
// ✅ STEP 4: Configure essential middleware (order matters!)
// Why: Middleware processes requests before they reach route handlers

// Middleware to add:
// 4a. app.use(cors()) - Enables cross-origin requests from frontend
// 4b. app.use(express.json()) - Parses JSON bodies (req.body will contain parsed JSON)
// 4c. app.use(express.urlencoded({ extended: false })) - Parses URL-encoded bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Optional development middleware:
// 4d. Request logging middleware (log method, URL, timestamp)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// ✅ STEP 5: Mount route handlers
// Why: Routes define the API endpoints and their handlers
// 5a. app.use('/api/users', userRoutes) - Mount user routes at /api/users
// 5b. app.use('/api/tasks', taskRoutes) - Mount task routes at /api/tasks

app.use("/api/users",userRoutes);
app.use("api/tasks",taskRoutes);

// ✅ STEP 6: Add error handling middleware (should be last!)
// Why: Catches any errors not handled by routes and sends appropriate responses
// 6a. 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// 6b. Global error handler for server errors
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Server error" });
});

// ✅ STEP 7: Start the server
// Why: Server must listen on a port to handle incoming requests
// Steps:
// 7a. Get PORT from environment variables (default to 5000)
const PORT = process.env.PORT || 5000;

// 7b. Use app.listen(PORT, callback) to start server
// 7c. Log server status and URL for development
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}`);
});

// 🔄 APPLICATION FLOW:
// 1. Load environment variables
// 2. Connect to database  
// 3. Configure middleware
// 4. Set up routes
// 5. Add error handling
// 6. Start server listening

// 🛡️ MIDDLEWARE ORDER (VERY IMPORTANT):
// 1. CORS (before any route handling)
// 2. Body parsing (json, urlencoded)
// 3. Custom middleware (logging, authentication, etc.)
// 4. Route handlers
// 5. 404 handler (catch unmatched routes)
// 6. Error handling middleware (catch all errors)

// 🌐 API STRUCTURE:
// Base URL: http://localhost:5000
// User endpoints: /api/users/* (register, login)
// Task endpoints: /api/tasks/* (CRUD operations)

// 💡 PRO TIPS:
// - Use process.env.NODE_ENV to detect development vs production
// - Add request logging middleware for debugging
// - Consider adding rate limiting middleware
// - Add helmet.js for security headers in production
// - Implement graceful shutdown handling
// - Add health check endpoint (GET /health)

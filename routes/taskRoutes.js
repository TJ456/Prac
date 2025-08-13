// 🎯 LEARNING OBJECTIVE: Master protected routes, RESTful design, and middleware chaining

// ✅ STEP 1: Import express, taskController, and authMiddleware
// Why: Need router for route definitions, controllers for business logic, 
// and authMiddleware to protect routes (only authenticated users can access)
const express = require ("express");
const {getTasks,createTask,getTaskById, updateTask,deleteTask} = require("../controllers/taskController");
const dotenv = require ("dotenv");

// ✅ STEP 2: Create router instance
// const router = express.Router()
// Why: Router allows modular route definitions that can be mounted in app.js
const router = express.Router();

// ✅ STEP 3: Define protected task routes following RESTful conventions
// Why: All task operations require authentication, so every route uses authMiddleware

// Route Definitions (all require authentication):

// GET /api/tasks - Get all user's tasks
// - Method: GET (retrieving data)
// - Middleware: protect (authentication required)
// - Handler: taskController.getTasks
// - Returns: Array of user's tasks
router.get("/", protect, getTasks);
// POST /api/tasks - Create new task
// - Method: POST (creating new resource)  
// - Middleware: protect (authentication required)
// - Handler: taskController.createTask
// - Body: { title, description, status, priority, dueDate }
// - Returns: Created task object
router.post("/", protect, createTask);
// GET /api/tasks/:id - Get specific task by ID
// - Method: GET (retrieving specific resource)
// - Middleware: protect (authentication required)  
// - Handler: taskController.getTaskById
// - Params: id (task ID in URL)
// - Returns: Single task object
router.get("/:id", protect, getTaskById);
// PUT /api/tasks/:id - Update specific task
// - Method: PUT (updating entire resource)
// - Middleware: protect (authentication required)
// - Handler: taskController.updateTask  
// - Params: id (task ID in URL)
// - Body: Updated task fields
// - Returns: Updated task object
router.put("/:id", protect, updateTask);
// DELETE /api/tasks/:id - Delete specific task
// - Method: DELETE (removing resource)
// - Middleware: protect (authentication required)
// - Handler: taskController.deleteTask
// - Params: id (task ID in URL)  
// - Returns: Success message
router.delete("/:id", protect, deleteTask);
// ✅ STEP 4: Apply authMiddleware to all routes
// Two approaches:
// Option A: Apply to each route individually: router.get('/api/tasks', protect, getTasks)
// Option B: Apply to all routes: router.use(protect) before defining routes

// ✅ STEP 5: Export the router
// Why: app.js will import and mount this at /api/tasks
module.exports = router;
// 🔗 MIDDLEWARE CHAIN UNDERSTANDING:
// Request → authMiddleware (verify JWT) → route handler → response
// If authMiddleware fails, request stops and returns 401
// If authMiddleware succeeds, req.user is set and route handler executes

// 🌐 FULL API ENDPOINTS:
// - GET    http://localhost:5000/api/tasks
// - POST   http://localhost:5000/api/tasks  
// - GET    http://localhost:5000/api/tasks/:id
// - PUT    http://localhost:5000/api/tasks/:id
// - DELETE http://localhost:5000/api/tasks/:id

// 📝 RESTful DESIGN PRINCIPLES:
// - Use appropriate HTTP methods (GET, POST, PUT, DELETE)
// - Use plural nouns for resource names (/tasks not /task)
// - Use URL parameters for specific resources (:id)
// - Group related operations under same base path
// - Apply consistent middleware across related routes

// 💡 PRO TIPS:
// - Consider adding input validation middleware before controllers
// - Could add route for bulk operations (delete multiple tasks)
// - Could add filtering routes like GET /tasks?status=completed
// - Could add sorting routes like GET /tasks?sort=createdAt
// - Rate limiting might be useful for creation endpoints

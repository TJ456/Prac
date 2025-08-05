# 📦 Package.json Learning Guide

## 🎯 LEARNING OBJECTIVE
Understand how to set up a professional Node.js project with proper dependencies

## ✅ STEP 1: Define project metadata (name, version, description)
**Why:** This helps identify your project and its purpose. Every professional project needs this.

## ✅ STEP 2: Define scripts for development and production
- `"dev": "nodemon app.js"` - Uses nodemon to auto-restart server on file changes (development)
- `"start": "node app.js"` - Normal node execution for production

**Why:** Different environments need different startup methods

## ✅ STEP 3: Add dependencies needed for this project
- **express**: Web framework for Node.js - handles routes, middleware, HTTP requests
- **mongoose**: MongoDB object modeling tool - makes working with MongoDB easier  
- **jsonwebtoken**: For creating and verifying JWT tokens for authentication
- **bcryptjs**: For hashing passwords securely before storing in database
- **dotenv**: Loads environment variables from .env file for security
- **cors**: Enables Cross-Origin Resource Sharing for frontend-backend communication

## ✅ STEP 4: Add devDependencies (only for development)
- **nodemon**: Auto-restarts server when files change during development

## 💡 PRO TIP
Never put sensitive data in package.json. Use .env for secrets!

---

Now write your package.json following this structure!

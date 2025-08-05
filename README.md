# 🚀 Project Name: TaskFlow – The Ultimate Backend Practice Project

### 👨‍🏫 Description
TaskFlow is a backend-only project crafted to take you from beginner to mid-level Node.js + Express mastery. You'll build user authentication, protected routes, task management CRUD, token generation, and middleware – all step-by-step.

---
### 🔗 Project Flow & Learning Path
You must follow this order to learn concepts properly:

**1. models/userModel.js** – Learn how to design schemas with Mongoose
**2. models/taskModel.js** – Learn one-to-many relation (user can have many tasks)
**3. config/db.js** – Learn how to connect MongoDB with Node.js using Mongoose
**4. utils/generateToken.js** – Learn how JWT works and how to generate it
**5. middleware/authMiddleware.js** – Learn to create custom Express middleware to protect routes
**6. controllers/userController.js** – Learn to build register/login system securely
**7. routes/userRoutes.js** – Learn to map URLs to controllers
**8. controllers/taskController.js** – Learn business logic: CRUD ops with DB
**9. routes/taskRoutes.js** – Protect routes with authMiddleware
**10. app.js** – Tie everything together (middlewares, routes, server)

---
### 📦 Technologies Used
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- nodemon (dev)
- cors

---
### ⚙️ Installation & Run
```bash
npm install
npm run dev
```

Create `.env` file with:
```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
```

---
### 🧠 Concepts Covered
- Project Structure (Modular)
- MVC Design Pattern
- REST API Design
- JWT Auth & Middleware
- MongoDB Schema Design
- Error Handling
- .env config and secrets
- Connecting Frontend with APIs later

---
### 💡 Tip
Every file contains comments. Write code under each comment to practice the concept. This is your project. You are the developer now.

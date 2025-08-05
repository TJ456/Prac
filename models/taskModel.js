// 🎯 LEARNING OBJECTIVE: Master database relationships and task management schema design

// ✅ STEP 1: Import mongoose
// Why: Need mongoose to create schemas and establish relationships between collections
const mongoose = require ("mongoose");
// ✅ STEP 2: Define Task schema with user relationship
// Why: Each task belongs to a specific user (one-to-many relationship)
// This is fundamental for multi-user applications

// Field Guidelines:
// - title: String, required, trim, max 100 chars (task name)
// - description: String, optional, max 500 chars (task details)
// - status: String, enum ['pending', 'in-progress', 'completed'], default 'pending'
// - priority: String, enum ['low', 'medium', 'high'], default 'medium'
// - dueDate: Date, optional (when task should be completed)
// - user: ObjectId, ref 'User', required (which user owns this task)
// - timestamps: true (createdAt, updatedAt automatically added)

// 🔗 RELATIONSHIP EXPLANATION:
// user field creates relationship between Task and User collections
// ref: 'User' tells mongoose this field references User model
// This enables population (joining data) when querying

// ✅ STEP 3: Create and export the Task model
// Why: This model will be used in controllers to perform CRUD operations
const Task = mongoose.model('Task', userschema);
module.exports = Task;
// 💡 PRO TIPS:
// - Use enums for status/priority to prevent invalid values
// - Consider adding categories field for task organization  
// - Index user field for faster queries when fetching user's tasks
// - Virtual fields can calculate derived data (like days until due)

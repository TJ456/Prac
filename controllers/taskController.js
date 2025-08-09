// 🎯 LEARNING OBJECTIVE: Master CRUD operations, data relationships, and advanced MongoDB queries

// ✅ STEP 1: Import Task model 
// Why: Need Task model to perform database operations
// Controller handles business logic and coordinates between routes and database
const Task = require ("../models/taskModel");
// ✅ STEP 2: Create getTasks async function (Get all user's tasks)
// Why: Users should only see their own tasks, not everyone's tasks
// getTasks Logic Flow:
// 2a. Get user ID from req.user._id (set by 2authMiddleware)
// 2b. Use Task.find({ user: req.user._id }) to get only user's tasks
// 2c. Optional: Add sorting .sort({ createdAt: -1 }) for newest first
// 2d. Optional: Add population .populate('user', 'name email') to include user details
// 2e. Return tasks array with 200 status
// 2f. Handle errors with try-catch, return 500 on server error

const getTasks = async (req , res)=>{
   try{
    const tasks = await Task.find({user: req.user._id})
    .sort({createdAt: -1})
    .populate("user","name email");

    res.status(200).json({tasks});
   }    
   catch(error){
    res.status(500).json({message:"task fetching error"});
   }

 };


// ✅ STEP 3: Create createTask async function (Create new task)
// Why: Users need to add new tasks to their task list

// createTask Logic Flow:
// 3a. Extract title, description, status, priority, dueDate from req.body
// 3b. Validate required fields (title is required)
// 3c. Create task with Task.create({ ...req.body, user: req.user._id })
// 3d. Automatically assign current user as task owner
// 3e. Return created task with 201 status
// 3f. Handle validation errors (400) and server errors (500)
  const createTask = async ( req, res)=>{
     try{
        const {title ,description , status, priority ,duedate} = req.body;
        if(!title){
            res.status(400).json({message: "tittle is required"});
        }
        const newTask = Task.create({
            title,
            description,
            status,
            priority,
            duedate,
            user: req.user._id,// 3d. Automatically assign current user as task owner
        });
        
    
      res.status(201).json(newTask);

      }catch(error){
        res.status(400).json({message:"server error",error})
    }
  };

// ✅ STEP 4: Create getTaskById async function (Get single task)
// Why: Users might want to view details of a specific task

// getTaskById Logic Flow:
// 4a. Extract task ID from req.params.id
// 4b. Find task with Task.findById(req.params.id)
// 4c. Check if task exists, return 404 if not found
// 4d. Check if task belongs to current user (task.user.toString() === req.user._id.toString())
// 4e. Return 403 if user tries to access someone else's task
// 4f. Return task with 200 status if authorized
// 4g. Handle errors appropriately

const getTaskById = async (req,res)=>
{
    try{
  const{id} = req.params;
   const task = await Task.findById(id);
   if (!task){
    return res.status(400).json({message:"task not found"});
    
   }
if (task.user.toString() !== req.user._id.toString()){
    res.status(403).json({message:"Not authorized to view this task"})
}
res.status(200).json({message:"task is authorized",task});
}catch(error){
    res.status(401).json({message:"request failure"});
}

};

// ✅ STEP 5: Create updateTask async function (Update existing task)
// Why: Users need to modify their tasks (change status, edit details, etc.)

// updateTask Logic Flow:
// 5a. Extract task ID from req.params.id
// 5b. Find task and verify ownership (same as getTaskById)
// 5c. Use Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
// 5d. new: true returns updated document, runValidators: true applies schema validation
// 5e. Return updated task with 200 status
// 5f. Handle not found (404) and authorization (403) errors

const updateTask = async(req,res)=>{
 
    try{
    const {id} = req.params;
       const task = await Task.findById(id);
   if (!task){
    return res.status(400).json({message:"task not found"});
    
   }
if (task.user.toString() !== req.user._id.toString()){
    res.status(403).json({message:"Not authorized to view this task"})
}

const updatedTask = await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});

res.status(200).json({message:"updataed task",task: updatedTask});



    }catch(error){
 res.status(500).json({ message: "Server error", error: error.message });
    }
    

};


// ✅ STEP 6: Create deleteTask async function (Delete task)
// Why: Users need to remove completed or unwanted tasks

// deleteTask Logic Flow:
// 6a. Extract task ID from req.params.id//params are route parameters
// 6b. Find task and verify ownership
// 6c. Use Task.findByIdAndDelete(req.params.id) or task.remove()
// 6d. Return success message with 200 status
// 6e. Handle not found and authorization errors
const deleteTask = async(req,res)=>
{
    try{
const{id}= req.params;
       const task = await Task.findById(id);
   if (!task){
    return res.status(400).json({message:"task not found"});
    
   }
if (task.user.toString() !== req.user._id.toString()){
    res.status(403).json({message:"Not authorized to view this task"})
}
 const delTask = await Task.findByIdAndDelete(req.params.id);
 res.status(200).json({message:"task deleted successfully",task:delTask});
    }
    catch (error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ STEP 7: Export all controller functions
// Why: Routes will import these functions to handle task-related endpoints
module.exports = {getTasks,createTask,getTaskById, updateTask,deleteTask};
// 🔒 SECURITY CONSIDERATIONS:
// - Always verify task ownership before operations
// - Validate all input data to prevent injection attacks
// - Use req.user._id (from authMiddleware) to associate tasks with users
// - Never trust client-provided user IDs

// 📊 HTTP STATUS CODES TO USE:
// - 200: Successful GET, PUT, DELETE operations
// - 201: Successful task creation
// - 400: Bad request (validation errors, missing fields)
// - 403: Forbidden (trying to access someone else's task)
// - 404: Task not found
// - 500: Server error (database issues)

// 💡 PRO TIPS:
// - Add pagination for getTasks when user has many tasks
// - Consider adding search and filter functionality
// - Add task categories or tags for better organization
// - Implement task sharing between users
// - Add due date notifications
// - Consider soft delete (mark as deleted) instead of hard delete

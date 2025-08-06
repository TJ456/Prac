// 🎯 LEARNING OBJECTIVE: Master Mongoose schemas, data validation, and user authentication setup

// ✅ STEP 1: Import mongoose
// Why: Mongoose is an ODM (Object Document Mapper) that makes working with MongoDB easier
// It provides schema validation, type casting, query building, and middleware hooks
const mongoose = require ("mongoose");
// ✅ STEP 2: Define User schema with proper validation
// Why: Schema defines the structure of documents in MongoDB collection
// Validation ensures data integrity and prevents bad data from entering database
// Field Guidelines:
// - name: String, required, trim whitespace, min 2 chars, max 30 chars
// - email: String, required, unique index, lowercase, valid email format
// - password: String, required, min 6 chars (will be hashed before saving)
// - timestamps: true (automatically adds createdAt and updatedAt fields)
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"the name is required"],
        trim: true,
        minlength: 3,
        maxlength: 20,
        
    },
    email:{
        type:String,
        required:[true,"email should be given"],
        unique: true,
        lowercase:true,
        match:[/\S+@\S+\.\S+/, "Please use a valid email address"],
         
    },
 password :{
    type: String,
    required:true,
    minlength:[8,"Passowrd must be atlease 8 characters"],
 }
 },
 {timestamps:true
});

// 🔒 SECURITY NOTE: Never store plain text passwords!
// The password will be hashed using bcrypt before saving (done in controller)

// ✅ STEP 3: Create and export the User model
// Why: Model is a constructor function that creates documents
// Convention: Model names are capitalized and singular (User, not users)
const User = mongoose.model('User', userSchema);
module.exports = User;
// 💡 PRO TIPS:
// - Use unique: true for email to prevent duplicate users
// - Use trim: true to remove extra spaces
// - Consider adding user roles field for future admin features
// - Timestamps help track when users registered and last updated

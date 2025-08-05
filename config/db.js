// 🎯 LEARNING OBJECTIVE: Master database connection, error handling, and environment configuration

// ✅ STEP 1: Import mongoose and dotenv
// Why: mongoose handles MongoDB connection, dotenv loads environment variables
// Environment variables keep sensitive data (like DB URLs) out of source code

// ✅ STEP 2: Create connectDB async function with proper error handling
// Why: Database connections can fail, so we need try-catch blocks
// Async/await makes handling promises cleaner than .then() chains

// Connection Best Practices:
// - Use try-catch for error handling
// - Log successful connection with database name
// - Log errors with helpful messages
// - Use process.exit(1) to stop app if DB connection fails
// - Set mongoose options for better performance and deprecation warnings

// ✅ STEP 3: Configure mongoose connection options
// Recommended options to include:
// - useNewUrlParser: true (avoids deprecation warnings)
// - useUnifiedTopology: true (uses new connection management engine)

// ✅ STEP 4: Export the connectDB function
// Why: app.js will import and call this function to establish DB connection

// 🔒 SECURITY NOTES:
// - Never hardcode database URLs in source code
// - Use MONGO_URI environment variable
// - Different environments (dev, staging, prod) should use different databases

// 💡 PRO TIPS:
// - Consider connection pooling for production apps
// - Add connection event listeners for better monitoring
// - Use mongoose.set() for global configuration options
// - Handle graceful shutdown to close DB connections properly

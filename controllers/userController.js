// 🎯 LEARNING OBJECTIVE: Master authentication flow, password security, and API response patterns

// ✅ STEP 1: Import required modules
// - User model: For database operations
// - bcryptjs: For password hashing and comparison
// - generateToken: Custom utility for JWT creation
// Why: Controllers handle business logic and coordinate between models and routes

// ✅ STEP 2: Create registerUser async function
// Why: Registration creates new user accounts with secure password storage

// Registration Logic Flow:
// 2a. Extract name, email, password from req.body
// 2b. Validate input data (check if all required fields exist)
// 2c. Check if user already exists with this email (User.findOne({ email }))
// 2d. If user exists, return 400 "User already exists"
// 2e. Hash password using bcrypt.hash(password, saltRounds) - use 12 salt rounds
// 2f. Create new user with User.create({ name, email, password: hashedPassword })
// 2g. If successful, generate JWT token and return user data (without password)
// 2h. Response format: { _id, name, email, token }

// ✅ STEP 3: Create loginUser async function  
// Why: Login authenticates existing users and provides access tokens

// Login Logic Flow:
// 3a. Extract email and password from req.body
// 3b. Validate input (both email and password required)
// 3c. Find user by email (User.findOne({ email }))
// 3d. If no user found, return 401 "Invalid credentials"
// 3e. Compare password using bcrypt.compare(password, user.password)
// 3f. If password doesn't match, return 401 "Invalid credentials"
// 3g. If credentials valid, generate JWT token
// 3h. Return user data with token: { _id, name, email, token }

// ✅ STEP 4: Add proper error handling with try-catch
// Why: Database operations and bcrypt can throw errors
// - Wrap each function in try-catch
// - Return 500 "Server error" for unexpected errors
// - Log actual errors to console for debugging

// ✅ STEP 5: Export both controller functions
// Why: Routes will import these functions to handle authentication endpoints

// 🔒 SECURITY BEST PRACTICES:
// - Never store plain text passwords
// - Use high salt rounds for bcrypt (12+ for production)
// - Don't return passwords in API responses
// - Use same error message for "user not found" and "wrong password" (prevents email enumeration)
// - Validate and sanitize all input data
// - Consider rate limiting for auth endpoints

// 📊 HTTP STATUS CODES TO USE:
// - 200: Successful login/registration
// - 400: Bad request (missing fields, user already exists)
// - 401: Unauthorized (invalid credentials)
// - 500: Server error (database issues, bcrypt errors)

// 💡 PRO TIPS:
// - Consider email verification for registration
// - Add password strength validation
// - Implement account lockout after failed attempts
// - Log authentication events for security monitoring
// - Consider OAuth integration (Google, GitHub) for better UX

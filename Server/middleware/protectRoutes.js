const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");

const protectRoute = async (req, res, next) => {
  try {
    console.log("Cookies Received:", req.cookies); // Debugging log to check cookies

    // Extract JWT from cookies
    const token = req.cookies?.jwt;
    if (!token) {
      console.log("🚨 No JWT token found in cookies");
      return res.status(401).json({ message: "You need to log in" });
    }

    // Decode JWT and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging log for token

    // Find the user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("🚨 User not found with ID:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ User found:", user); // Debugging log for found user

    // Attach the user object to the request
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    return res.status(401).json({ error: "Unauthorized: Invalid token or session expired" });
  }
};

module.exports = protectRoute;
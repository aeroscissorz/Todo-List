const bcrypt = require("bcryptjs");
const User = require("../schema/userSchema");
const generateTokenAndSetCookie = require("../utils/tokengen");

exports.signin = async (req, res) => {
  try {
    const { fullname, email, password, confirmpassword } = req.body;

    if (!fullname || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ fullname, email, password: hash });
    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({ _id: newUser._id, fullname, email });
  } catch (err) {
    console.error("Error in signin:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ _id: user._id, fullname: user.fullname, email });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  try {
    console.log("Logout endpoint hit"); // ✅ Debugging log
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

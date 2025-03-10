const mongoose = require("mongoose");
//connectDB is my async function which takes the Connection key from the env file and awaits mongoose.connect() method to connect to DB, 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
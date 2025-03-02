const mongoose = require("mongoose");
//connectDB is my async function which takes the Connection key from the env file and awaits mongoose.connect() method to connect to DB, 
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connectDB;
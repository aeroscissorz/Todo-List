const mongoose = require ("mongoose");

const userdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("db connected");

    }
    catch(err){
        console.log(err);
    }
}

module.exports = userdb;
const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie =(userId,res)=>{
    const token = jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn:"15d"});
    res.cookie("jwt", token,{  maxAge: 15*24*60*60*1000, //ms
        httpOnly: true,  //prevent XSS attack cross site scripting attack
        sameSite: "strict", });

}
module.exports = generateTokenAndSetCookie;
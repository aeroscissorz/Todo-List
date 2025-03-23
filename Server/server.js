const path = require("path");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./database/db");
const todoRoutes = require("./routes/todoRoute");
const authRoutes = require("./routes/authRoutes");


const app = express();
const port = process.env.PORT || 5000;
app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend URL
      credentials: true, // Allows cookies and authentication headers
    })
  );  

app.use(express.json());
app.use(cookieParser());
app.use("/users",authRoutes);





app.use("/todos",todoRoutes);

app.use(express.static(path.join(__dirname, "../Client/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
});

connectDB().then(()=>{
    app.listen(port,()=>console.log(`server is running on ${port}`))
}).catch(err => console.log(err));



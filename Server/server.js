require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const todoRoutes = require("./routes/todoRoute");


const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

app.use("/todos",todoRoutes);

app.get("/", (req, res) => res.send("<h1>Server is running</h1>"));

connectDB().then(()=>{
    app.listen(port,()=>console.log(`server is running on ${port}`))
}).catch(err => console.log(err));



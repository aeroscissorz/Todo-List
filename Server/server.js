const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const todoRoutes = require("./routes/todoRoute");


const app = express();
const port = process.env.PORT || 5000;
//haha

app.use(express.json());
app.use(cors({ origin: "*" }));


app.use("/todos",todoRoutes);

app.use(express.static(path.join(__dirname, "../Client/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
});

connectDB().then(()=>{
    app.listen(port,()=>console.log(`server is running on ${port}`))
}).catch(err => console.log(err));



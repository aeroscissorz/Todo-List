const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 5000;
const connectionString = "mongodb+srv://shubhamsharma10112003:abcd1234@cluster0.wbakj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//mongoose.connect(connectionString).then(()=> console.log("connected db")).catch((err)=>console.log("error",err));
const bodyParser = require("body-parser");
const uuid = require("uuid");


app.use(bodyParser.json()); 
const cors = require("cors");
app.use(cors());

const TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
});

const Todo = mongoose.model("Todo",TodoSchema);

app.get( "/",(req , res , next) =>{
    res.send("<h1>it is running</h1>");
});

app.get("/todos", async(req, res) =>{
    const todos = await Todo.find({});
    res.json(todos);
});

app.post("/todos" , async(req, res) =>{
    const todo = await Todo.create(req.body);
    res.json(todo);
})

app.get("/todos/:id", async(req, res)=>{
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
})

app.put("/todos/:id", async(req,res)=>{
    const todo = await Todo.findByIdAndUpdate(req.params.id , req.body);
    res.json(todo);
})

app.delete("/todos/:id", async(req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
})

function connectDB(url){
    return mongoose.connect(url);
}
async function start(){
    try{
        await connectDB(connectionString)
        app.listen(port , ()=>{
            console.log(" the app is  listening on", port );
        });
    }
    catch(err){
        console.log(err);
    }
}
start();


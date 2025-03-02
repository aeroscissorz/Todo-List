const Todo = require("../schema/schema");

exports.getTodos = async (req,res) =>{
    const todos = await Todo.find({});
    res.json(todos);
}

exports.createTodos = async(req,res) => {
    const todo = await Todo.create(req.body);
    res.json(todo);
}

exports.getTodoById = async(req,res)=>{
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
}

exports.updateTodos = async(req,res) =>{
    const todo = await Todo.findByIdAndUpdate(req.params.id , req.body);
    res.json(todo);
}

exports.deleteTodos = async(req,res) =>{
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
}
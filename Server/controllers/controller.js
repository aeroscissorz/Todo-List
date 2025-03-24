const Todo = require("../schema/schema");

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id }); // Fetch only user's todos
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
};

exports.createTodos = async (req, res) => {
    try {
        const todo = await Todo.create({ ...req.body, user: req.user._id }); // Associate todo with user
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error creating todo" });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id }); // Check ownership
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todo" });
    }
};

exports.updateTodos = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id }, // Ensure user owns the todo
            req.body,
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo" });
    }
};

exports.deleteTodos = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id }); // Ensure user owns the todo
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo" });
    }
};

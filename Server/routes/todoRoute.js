const express = require("express");
const { getTodos, createTodos, getTodoById, updateTodos, deleteTodos } = require("../controllers/controller");
const protectRoute = require("../middleware/protectRoutes");

const router = express.Router();

// Apply the middleware to protect these routes
router.get("/", protectRoute, getTodos);
router.post("/", protectRoute, createTodos);
router.get("/:id", protectRoute, getTodoById);
router.put("/:id", protectRoute, updateTodos);
router.delete("/:id", protectRoute, deleteTodos);

module.exports = router;
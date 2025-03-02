const express = require("express");

const {getTodos , createTodos, getTodoById , updateTodos , deleteTodos}  = require("../controllers/controller");

const router = express.Router();

router.get("/",getTodos);
router.post("/",createTodos);
router.get("/:id",getTodoById);
router.put("/:id",updateTodos);
router.delete("/:id",deleteTodos);

module.exports = router;


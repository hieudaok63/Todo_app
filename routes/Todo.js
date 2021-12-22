const express = require("express");
const { mongo } = require("mongoose");
const router = express.Router();

const {
    getAllTodos,
    createTodo,
    getTodoById,
    getTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/Todo");

router.get("/todos/", getAllTodos);

router.post("/todo/create", createTodo);

router.param("todoId", getTodoById);

router.get("/todo/:todoId", getTodo);

router.put("/todo/:todoId/update", updateTodo);

router.delete("/todo/:todoId/delete", deleteTodo);

module.exports = router;
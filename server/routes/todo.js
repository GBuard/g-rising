const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET tous les todos
router.get("/", async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
});

// POST un nouveau todo
router.post("/", async (req, res) => {
    const { text, link } = req.body;
    const todo = new Todo({ text, link });
    await todo.save();
    res.status(201).json(todo);
});

// PATCH pour cocher/décocher
router.patch("/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
});

// DELETE un todo
router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé" });
});

module.exports = router;

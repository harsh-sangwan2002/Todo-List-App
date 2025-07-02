const taskModel = require('../models/task.model');

const getTasks = (req, res) => {
    res.json(taskModel.getAllTasks());
};

const addTask = (req, res, next) => {
    const { title, completed } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
    }
    try {
        const newTask = taskModel.addTask(title.trim(), completed === true);
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

const updateTask = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const { completed } = req.body;
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed status must be a boolean.' });
    }
    try {
        const updatedTask = taskModel.updateTaskStatus(id, completed);
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.json(updatedTask);
    } catch (err) {
        next(err);
    }
};

const deleteTask = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    try {
        const deletedTask = taskModel.deleteTask(id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.json(deletedTask);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};
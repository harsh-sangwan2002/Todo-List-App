const taskRouter = require('express').Router();
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');

taskRouter.get('/', getTasks)
    .post('/', addTask)
    .put('/:id', updateTask)
    .delete('/:id', deleteTask);

module.exports = taskRouter; 
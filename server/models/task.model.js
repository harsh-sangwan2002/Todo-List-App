let tasks = [];
let currentId = 1;

const getAllTasks = () => tasks;

const addTask = (title, completed = false) => {
    const newTask = { id: currentId++, title, completed };
    tasks.push(newTask);
    return newTask;
};

const updateTaskStatus = (id, completed) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = completed;
        return task;
    }
    return null;
};

const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        return tasks.splice(index, 1)[0];
    }
    return null;
};

const getTaskById = (id) => tasks.find(t => t.id === id);

module.exports = {
    getAllTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    getTaskById
}; 
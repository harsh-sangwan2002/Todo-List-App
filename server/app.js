const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const taskRouter = require('./routes/task.route');
const PORT = process.env.PORT || 8080;

app.use('/tasks', taskRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

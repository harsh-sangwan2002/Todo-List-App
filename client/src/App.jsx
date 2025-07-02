import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css'

const API_URL = 'http://localhost:8080/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHorizontal, setIsHorizontal] = useState(false);
  const listRef = useRef(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Check if the list should be horizontal
  useEffect(() => {
    if (listRef.current) {
      const maxHeight = window.innerHeight * 0.6;
      setIsHorizontal(listRef.current.scrollHeight > maxHeight);
    }
  }, [tasks]);

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setLoading(true);
    setError('');
    try {
      await axios.post(API_URL, { title: newTask });
      setNewTask('');
      fetchTasks();
    } catch (err) {
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete
  const handleToggleComplete = async (task) => {
    setLoading(true);
    setError('');
    try {
      await axios.put(`${API_URL}/${task.id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newTask.trim()}>Add</button>
      </form>
      {error && <div style={{ color: '#e53935', marginBottom: 12 }}>{error}</div>}
      {loading ? (
        <div style={{ textAlign: 'center', color: '#1976d2' }}>Loading...</div>
      ) : (
        <ul
          className={`task-list${isHorizontal ? ' horizontal' : ''}`}
          ref={listRef}
        >
          {tasks.length === 0 && <li style={{ textAlign: 'center', color: '#aaa' }}>No tasks yet.</li>}
          {tasks.map(task => (
            <li className="task-item" key={task.id}>
              <span className={`task-title${task.completed ? ' completed' : ''}`}>{task.title}</span>
              <div className="task-actions">
                <button
                  className="complete"
                  onClick={() => handleToggleComplete(task)}
                  disabled={loading}
                >{task.completed ? 'Undo' : 'Complete'}</button>
                <button
                  className="delete"
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={loading}
                >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App

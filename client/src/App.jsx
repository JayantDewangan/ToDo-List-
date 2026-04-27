import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
    setLoading(false);
  };

  const addTask = async () => {
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }
    setError('');
    const res = await axios.post(`${API}/tasks`, { title });
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const toggleTask = async (task) => {
    const res = await axios.patch(`${API}/tasks/${task._id}`, {
      completed: !task.completed
    });
    setTasks(tasks.map(t => t._id === task._id ? res.data : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  // save edited title
  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    const res = await axios.put(`${API}/tasks/${id}`, { title: editTitle });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
    setEditingId(null);
    setEditTitle('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="container">
      <h1>My Tasks</h1>

      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <div className="task-list">
          {tasks.length === 0 && <p className="loading">No tasks yet.</p>}
          {tasks.map(task => (
            <div className="task-item" key={task._id}>
              <div className="task-main">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                />

                {/* if editing this task show input, else show title */}
                {editingId === task._id ? (
                  <input
                    className="edit-input"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveEdit(task._id)}
                    autoFocus
                  />
                ) : (
                  <span className={task.completed ? 'done' : ''}>
                    {task.title}
                  </span>
                )}

                <div className="task-actions">
                  {/* edit / save button */}
                  {editingId === task._id ? (
                    <button className="save-btn" onClick={() => saveEdit(task._id)}>save</button>
                  ) : (
                    <button className="edit-btn" onClick={() => {
                      setEditingId(task._id);
                      setEditTitle(task.title);
                      setExpandedId(null);
                    }}>Edit</button>
                  )}

                  {/* expand to see task details */}
                  <button
                    className="info-btn"
                    onClick={() => setExpandedId(expandedId === task._id ? null : task._id)}
                  >
                    {expandedId === task._id ? 'Hide' : 'Info'}
                  </button>

                  <button className="delete-btn" onClick={() => deleteTask(task._id)}>×</button>
                </div>
              </div>

              {/* task detail section - shows when info is clicked */}
              {expandedId === task._id && (
                <div className="task-detail">
                  <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                  <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
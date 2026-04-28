import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

function App(){
  const [ tasks, setTasks ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const [ editingId, setEditingId ] = useState(null);
  const [ editTitle, setEditTitle ] = useState('');
  const [ expandedId, setExpandedId ] = useState(null);
  const searchTimeout = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (keyword = '') =>{
    setLoading(true);
    setError('');
    try{
      const res = await axios.get(`${API}/tasks`,{
        params: keyword ? { search: keyword } : {}
      });
      setTasks(res.data);
    } catch(err){
      setError('Failed to load tasks');
    }
    setLoading(false);
  };

  const addTask = async ()=>{
    if(!title.trim()){
      setError('Please enter a task title');
      return;
    }
    setError('');
    try{
      const res = await axios.post(`${API}/tasks`,{ title });
      setTasks([...tasks, res.data]);
      setTitle('');
    } catch(err){
      setError('Failed to add task');
    }
  };

  const toggleTask = async (task)=>{
    try{
      const res = await axios.patch(`${API}/tasks/${task._id}`, {
        completed: !task.completed
      });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch(err){
      setError('Failed to update task status');
    }
  };

  const deleteTask = async (id)=>{
    try{
      await axios.delete(`${API}/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch(err){
      setError('Failed to delete task');
    }
  };

  const saveEdit = async (id)=>{
    if(!editTitle.trim()){
      setError('Title cannot be empty');
      return;
    }
    try{
      const res = await axios.put(`${API}/tasks/${id}`, { title: editTitle });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
      setEditingId(null);
      setEditTitle('');
    } catch(err){
      setError('Failed to update task');
    }
  };


const handleSearch = (e) => {
  const val = e.target.value;
  setSearch(val);

  clearTimeout(searchTimeout.current);
  searchTimeout.current = setTimeout(() => {
    fetchTasks(val);
  }, 400);
};


  return (
    <div className="container">
      <h1>My Tasks</h1>

      <div className='add-task'>
        <input type="text" placeholder='Add a new task...' value={title} onChange={e => setTitle(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTask()}/>
        <button onClick={addTask}>Add</button>
      </div>

      <input className='search-bar' type="text" placeholder='Search tasks...' value={search} onChange={handleSearch}/>

      {error && <p className='error'>{error}</p>}

      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div className='task-list'>
          {tasks.length === 0 && <p className='loading'>No tasks yet.</p>}
          {tasks.map(task => (
            <div className='task-item' key={task._id}>
              <div className='task-main'>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={()=>toggleTask(task)}
                />
                {editingId === task._id ? (
                  <input
                    className='edit-input'
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveEdit(task._id)}
                    autoFocus
                  />
                ) : (
                  <span className={task.completed ? 'done' : ''}>{task.title}</span>
                )}
                <div className='task-actions'>
                  {editingId === task._id ? (
                    <button className='save-btn' onClick={() => saveEdit(task._id)}>Save</button>
                  ) : (
                    <button className='edit-btn' onClick={()=>{
                      setEditingId(task._id);
                      setEditTitle(task.title);
                      setExpandedId(null);
                    }}>Edit</button>
                  )}
                  <button className='info-btn' onClick={() => setExpandedId(expandedId === task._id ? null : task._id)}>  
                    {expandedId === task._id ? 'hide' : 'Info'}
                  </button>
                  <button className='delete-btn' onClick={()=>deleteTask(task._id)}>x</button>
                </div>
              </div>
              {expandedId === task._id && (
                <div className='task-detail'>
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

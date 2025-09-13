import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API } from '../global';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get(`${API}/tasks`);

      setTasks(result.data);
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            <div className="task-title">{task.title}</div>
            <div className="task-actions">
              <Link to={`/edit/${task._id}`} className="edit-button">Edit</Link> {/* Apply edit-button class here */}
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/add">
        <button>Add New Task</button>
      </Link>
    </div>
  );
};

export default TaskList;

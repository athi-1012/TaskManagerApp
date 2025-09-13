import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../global';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    axios.get(`${API}/tasks/${id}`)

      .then(res => setTask(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`${API}/tasks/${id}`)
      .then(() => history.push('/'))
      .catch(err => console.error(err));
  };

  return (
    task ? (
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate.substring(0, 10)}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    ) : <p>Loading...</p>
  );
};

export default TaskDetail;

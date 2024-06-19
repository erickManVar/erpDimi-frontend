import React, { useState } from 'react';
import axios from '../api/axios';

const ProjectForm = ({ onProjectCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/projects', {
        name,
        description,
        startDate,
        endDate,
        budget,
        status,
        userId: parseInt(userId), // Ensure userId is an integer
      });
      onProjectCreated(response.data);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" required />
      <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" required />
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" required />
      <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;

// src/Components/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // This could be more complex, involving actual role checking from the backend
  const role = JSON.parse(localStorage.getItem('user')).role;

  if (role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Welcome, Admin!</h1>
      <button onClick={() => navigate('/admin/create-article')}>Create Article</button>
      <button onClick={() => navigate('/admin/my-articles')}>My Articles</button>
      <button onClick={() => navigate('/profile')}>My Profile</button>
    </div>
  );
};

export default AdminDashboard;

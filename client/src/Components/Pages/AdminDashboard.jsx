import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Retrieve the user object from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Check if the user object and role are available
  const role = user?.role;

  if (role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={() => navigate('/admin/create-article')}>Create Article</button>
      <button onClick={() => navigate('/admin/my-articles')}>My Articles</button>
      <button onClick={() => navigate('/profile')}>My Profile</button>
    </div>
  );
};

export default AdminDashboard;

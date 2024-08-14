import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Retrieve the user object from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Check if the user object and role are available
  const role = user?.role;

  if (role !== 'admin') {
    return <div className="access-denied">Access Denied</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Welcome, {user.name}</h1>
      <div className="admin-dashboard-buttons">
        <button className="admin-dashboard-button" onClick={() => navigate('/admin/create-article')}>
          Create Article
        </button>
        <button className="admin-dashboard-button" onClick={() => navigate('/admin/my-articles')}>
          My Articles
        </button>
        <button className="admin-dashboard-button" onClick={() => navigate('/profile')}>
          My Profile
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

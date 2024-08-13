// src/Components/UserDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleArticleList = () => {
    navigate('/articles');
  };

  const handleProfilePage = () => {
    navigate('/profile');
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={handleArticleList}>View Article List</button>
      <button onClick={handleProfilePage}>View Profile Page</button>
    </div>
  );
};

export default UserDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleArticleList = () => {
    navigate('/articles');
  };

  const handleProfilePage = () => {
    navigate('/profile');
  };

  return (
    <div className="user-dashboard-container">
      <h1 className="user-dashboard-title">User Dashboard</h1>
      <div className="user-dashboard-buttons">
        <button className="user-dashboard-button" onClick={handleArticleList}>
          View Article List
        </button>
        <button className="user-dashboard-button" onClick={handleProfilePage}>
          View Profile Page
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;

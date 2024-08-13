import React, { useEffect, useState } from 'react';
import jwt from 'jwt-simple';
import './Profile.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt.decode(token, null, true);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setError('Token has expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return;
        }

        const userDetails = localStorage.getItem('user');
        if (userDetails) {
          const parsedUser = JSON.parse(userDetails); // Parse the user data
          setUser(parsedUser);
        } else {
          setError('No user details found');
        }
      } catch (e) {
        setError('Error decoding token or parsing user data');
        console.error(e);
      }
    } else {
      setError('No token found');
    }
  }, []);

  const handleClose = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userRole = storedUser?.role;

    if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (userRole === 'user') {
      navigate('/user-dashboard');
    } else {
      navigate('/'); // Default redirect if no user role found
    }
  };

  return (
    <div className="profile-container">
      {error && <p className="profile-error">{error}</p>}
      {user ? (
        <div className="profile-details">
          <h1 className="profile-title">Profile</h1>
          <p className="profile-info"><strong>Name:</strong> {user.name}</p>
          <p className="profile-info"><strong>Email:</strong> {user.email}</p>
          <p className="profile-info"><strong>Role:</strong> {user.role}</p>
          <button className="close-button" onClick={handleClose}>Close</button>
        </div>
      ) : (
        <p className="profile-loading">Loading...</p>
      )}
    </div>
  );
};

export default Profile;

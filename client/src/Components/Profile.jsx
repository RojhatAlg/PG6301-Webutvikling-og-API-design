import React, { useEffect, useState } from 'react';
import jwt from 'jwt-simple';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

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

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <div>
          <h1>Profile</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {/* Display more user details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;

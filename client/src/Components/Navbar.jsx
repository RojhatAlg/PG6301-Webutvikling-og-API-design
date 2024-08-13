// src/Components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Components/Utils/AuthContext';

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            {userRole === 'admin' && (
              <>
                <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                <li><Link to="/admin/create-article">Create Article</Link></li>
              </>
            )}
            {userRole === 'user' && (
              <>
                <li><Link to="/user-dashboard">User Dashboard</Link></li>
              </>
            )}
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

// src/Components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Components/Utils/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-middle">
        {isAuthenticated && (
          <>
            <Link to="/articles">View Articles</Link>
            {userRole === 'admin' && <Link to="/admin/my-articles">My Articles</Link>}
          </>
        )}
        {isAuthenticated && (
          <Link to={userRole === 'admin' ? '/admin/dashboard' : '/user-dashboard'}>
            {userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
          </Link>
        )}
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

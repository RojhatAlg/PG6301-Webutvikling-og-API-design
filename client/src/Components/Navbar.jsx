import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Components/Utils/AuthContext'; // Ensure this path is correct
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/articles">Home</Link>
      </div>
      <div className="navbar-middle">
        {isAuthenticated ? (
          <>
            <Link to="/articles">View Articles</Link>
            {userRole === 'admin' && <Link to="/admin/my-articles">My Articles</Link>}
            <Link to={userRole === 'admin' ? '/admin/dashboard' : '/user-dashboard'}>
              {userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      {isAuthenticated && (
        <div className="navbar-right">
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

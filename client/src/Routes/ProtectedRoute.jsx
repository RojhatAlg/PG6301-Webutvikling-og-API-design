// src/Components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decode JWT
  
  const isAuthenticated = !!token;
  const userRole = user?.role; // Extract user role from token

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;

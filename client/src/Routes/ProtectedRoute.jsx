// src/Components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, requiredRoles = [], ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role;

  console.log('Token:', token);  // Debugging
  console.log('User Role:', userRole);  // Debugging
  console.log('Required Roles:', requiredRoles);  // Debugging

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    return <div>Access Denied</div>;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;

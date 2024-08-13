import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  return (
    <Route
      {...rest}
      element={token && userRole === role ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;

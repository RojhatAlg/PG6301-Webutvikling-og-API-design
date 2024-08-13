import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AdminPrivateRoute = () => {

  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoute;

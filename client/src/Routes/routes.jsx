import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import Profile from '../Components/Profile';
import AdminDashboard from '../Components/Pages/AdminDashboard';
import CreateArticle from '../Components/CreateArticle';
import EditArticle from '../Components/EditArticle';
import MyArticles from '../Components/MyArticles';
import ArticlesList from '../Components/ArticleList';
import ArticleDetail from '../Components/ArticleDetail';
import UserDashboard from '../Components/Pages/UserDashboard';
import Navbar from '../Components/Navbar'; 
import './styles.css';

function AppRoutes() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="app-container">
      <Navbar /> 
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/article/:id" element={<PrivateRoute element={ArticleDetail} />} />
        <Route path="/user-dashboard" element={<PrivateRoute element={UserDashboard} requiredRole="user" />} />
        <Route path="/admin/dashboard" element={<PrivateRoute element={AdminDashboard} requiredRole="admin" />} />
        <Route path="/admin/create-article" element={<PrivateRoute element={CreateArticle} requiredRole="admin" />} />
        <Route path="/admin/edit-article/:id" element={<PrivateRoute element={EditArticle} requiredRole="admin" />} />
        <Route path="/admin/my-articles" element={<PrivateRoute element={MyArticles} requiredRole="admin" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

// PrivateRoute component to handle role-based access
const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userRole = storedUser?.role;

  if (!userRole || (requiredRole && userRole !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

export default AppRoutes;

import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../Components/Utils/AuthContext'; // Correct path for AuthContext
import Login from '../Components/Auth/Login'; // Adjust paths as necessary
import Register from '../Components/Auth/Register';
import UserDashboard from '../Components/Pages/UserDashboard';
import AdminDashboard from '../Components/Pages/AdminDashboard';
import ArticlesList from '../Components/ArticleList';
import ArticleDetail from '../Components/ArticleDetail';
import EditArticle from '../Components/EditArticle';
import MyArticles from '../Components/MyArticles';
import CreateArticle from '../Components/CreateArticle';
import Profile from '../Components/Profile';

const AppRouter = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext); // Use useContext to access AuthContext

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/public-articles" element={<ArticlesList />} />
      <Route path="/article/:id" element={<ArticleDetail />} />

      {/* Routes for Unauthenticated Users */}
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {/* Routes for Authenticated Users */}
      {isAuthenticated && (
        <>
          {/* Redirects for User Role */}
          {userRole === 'user' && (
            <>
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/create-article" element={<Navigate to="/user-dashboard" />} />
              <Route path="/admin/edit-article/:id" element={<Navigate to="/user-dashboard" />} />
              <Route path="/admin/my-articles" element={<Navigate to="/user-dashboard" />} />
            </>
          )}

          {/* Redirects for Admin Role */}
          {userRole === 'admin' && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/my-articles" element={<MyArticles />} />
              <Route path="/admin/edit-article/:id" element={<EditArticle />} />
              <Route path="/admin/create-article" element={<CreateArticle />} />
              <Route path="/user-dashboard" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {/* Common Routes for Both User and Admin */}
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </>
      )}

      {/* Redirects for Authenticated Users */}
      {isAuthenticated && (
        <>
          <Route path="/login" element={<Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/user-dashboard'} />} />
          <Route path="/register" element={<Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/user-dashboard'} />} />
        </>
      )}

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/articles" />} />
      <Route path="*" element={<Navigate to="/articles" />} /> {/* Handle 404s */}
    </Routes>
  );
};

export default AppRouter;

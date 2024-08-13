// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import ProtectedRoute from '../Routes/ProtectedRoute';
import MainLayout from '../Components/MainLayout';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<ProtectedRoute element={Profile} requiredRole="user" />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute element={AdminDashboard} requiredRole="admin" />} />
                <Route path="/admin/create-article" element={<ProtectedRoute element={CreateArticle} requiredRole="admin" />} />
                <Route path="/admin/edit-article/:id" element={<ProtectedRoute element={EditArticle} requiredRole="admin" />} />
                <Route path="/admin/my-articles" element={<ProtectedRoute element={MyArticles} requiredRole="admin" />} />
                <Route path="/" element={<ArticlesList />} />
                <Route path="/articles" element={<ArticlesList />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/user-dashboard" element={<ProtectedRoute element={UserDashboard} requiredRole="user" />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;

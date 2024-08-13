import { Routes, Route, Naviagte } from 'react-router-dom';
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

function AppRoutes() {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-article" element={<CreateArticle />} />
            <Route path="/admin/edit-article/:id" element={<EditArticle />} />
            <Route path="/admin/my-articles" element={<MyArticles />} />
            <Route path="/" element={<ArticlesList />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/article/:id" element={<ArticleDetail/>} />
            <Route path="/user-dashboard" element={<UserDashboard/>} />
         </Routes>
    )
}

export default AppRoutes;
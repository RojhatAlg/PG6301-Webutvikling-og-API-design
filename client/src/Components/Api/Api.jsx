import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export const login = (data) => API.post('/users/login', data);
export const register = (data) => API.post('/users/register', data);
export const fetchArticles = () => API.get('/');
export const fetchArticleById = (id) => API.get(`/articles/${id}`);
export const createArticle = (data) => API.post('/articles', data, {
  headers: { 'x-auth-token': localStorage.getItem('token') }
});

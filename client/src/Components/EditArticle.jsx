// src/Components/EditArticle.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({ title: '', category: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/articles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article', error.response ? error.response.data : error.message);
      }
    };

    fetchArticle();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/articles/${id}`, article, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin/my-articles');
    } catch (error) {
      console.error('Error updating article', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={article.title}
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        required
      />
      <select
        value={article.category}
        onChange={(e) => setArticle({ ...article, category: e.target.value })}
        required
      >
        <option value="News">News</option>
        <option value="Sports">Sports</option>
        <option value="Entertainment">Entertainment</option>
        {/* Add more categories as needed */}
      </select>
      <textarea
        value={article.text}
        onChange={(e) => setArticle({ ...article, text: e.target.value })}
        required
      ></textarea>
      <button type="submit">Update Article</button>
    </form>
  );
};

export default EditArticle;

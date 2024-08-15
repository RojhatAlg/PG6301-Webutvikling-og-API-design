import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyArticles.css';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/admin-articles/my-articles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles', error.response ? error.response.data : error.message);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/admin-articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(articles.filter(article => article._id !== id));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error('Error deleting article', error.response ? error.response.data : error.message);
    }
  };

  const handleDetailsClick = (id) => {
    navigate(`/articles/${id}`, { state: { fromAdmin: true } });  // Pass id and state
  };

  return (
    <div className="my-articles-container">
      <h1 className="my-articles-title">My Articles</h1>

      {showPopup && (
        <div className="delete-popup">
          Delete article successful
        </div>
      )}

      {articles.length > 0 ? (
        articles.map(article => (
          <div key={article._id} className="article-item">
            <h2 className="article-title">{article.title}</h2>
            <div className="article-buttons">
              <button className="edit-button" onClick={() => navigate(`/admin/edit-article/${article._id}`)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(article._id)}>Delete</button>
              <button className="details-button" onClick={() => handleDetailsClick(article._id)}>See Details</button>
            </div>
          </div>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default MyArticles;

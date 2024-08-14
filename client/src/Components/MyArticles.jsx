import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyArticles.css';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/articles/my-articles', {
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
      await axios.delete(`http://localhost:5000/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(articles.filter(article => article._id !== id));

      // Show the delete success popup
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting article', error.response ? error.response.data : error.message);
    }
  };

  const handleDetailsClick = (article) => {
    navigate(`/article/${article._id}`, { state: { fromAdmin: true } });
  };

  const handleCloseDetails = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="my-articles-container">
      <h1 className="my-articles-title">My Articles</h1>

      {showPopup && (
        <div className="delete-popup">
          Delete article successful
        </div>
      )}

      {selectedArticle && (
        <div className="article-details-overlay">
          <div className="article-details">
            <p><strong>Category:</strong> {selectedArticle.category}</p>
            <p><strong>Text:</strong> {selectedArticle.text}</p>
            <button className="close-button" onClick={handleCloseDetails}>Close</button>
          </div>
        </div>
      )}

      {articles.map(article => (
        <div key={article._id} className="article-item">
          <h2 className="article-title">{article.title}</h2>
          <div className="article-buttons">
            <button className="edit-button" onClick={() => navigate(`/admin/edit-article/${article._id}`)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(article._id)}>Delete</button>
            <button className="details-button" onClick={() => handleDetailsClick(article)}>See Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyArticles;

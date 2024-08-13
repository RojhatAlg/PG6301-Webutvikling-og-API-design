import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyArticles.css'; // Import the CSS file

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null); // State to manage the article details view
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
    } catch (error) {
      console.error('Error deleting article', error.response ? error.response.data : error.message);
    }
  };

  const handleDetailsClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseDetails = () => {
    setSelectedArticle(null);
  };

  const handleClose = () => {
    navigate('/admin/dashboard'); // Navigate to the homepage or ArticlesList
  };

  return (
    <div className="my-articles-container">
      <h1 className="my-articles-title">My Articles</h1>
      {articles.map(article => (
        <div key={article._id} className="article-item">
          <h2 className="article-title">{article.title}</h2>
          <div className="article-buttons">
            <button className="edit-button" onClick={() => navigate(`/admin/edit-article/${article._id}`)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(article._id)}>Delete</button>
            <button className="details-button" onClick={() => handleDetailsClick(article)}>See Details</button>
          </div>
          <button className="close-button" onClick={handleClose}>Close</button>
          {selectedArticle && selectedArticle._id === article._id && (
            <div className="article-details">
              <p><strong>Category:</strong> {selectedArticle.category}</p>
              <p><strong>Text:</strong> {selectedArticle.text}</p>
              <button className="close-button" onClick={handleCloseDetails}>Close</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyArticles;

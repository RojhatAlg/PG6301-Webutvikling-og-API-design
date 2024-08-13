import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ArticleDetail.css'; // Import the CSS file

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Add useNavigate hook for navigation

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article', error.response ? error.response.data : error.message);
      }
    };

    fetchArticle();
  }, [id]);

  const handleClose = () => {
    navigate('/'); // Navigate to the homepage or ArticlesList
  };

  if (!article) return <div className="loading">Loading...</div>;

  return (
    <div className="article-detail-container">
      
      <h1 className="article-detail-title">{article.title}</h1>
      <p className="article-detail-category">Category: {article.category}</p>
      <p className="article-detail-text">{article.text}</p>
      <p className="article-detail-author">Author: {article.author.name}</p>
      <button className="close-button" onClick={handleClose}>Close</button>
    </div>
  );
};

export default ArticleDetail;

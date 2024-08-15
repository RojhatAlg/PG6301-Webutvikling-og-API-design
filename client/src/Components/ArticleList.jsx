import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ArticleList.css'; 

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/articles'); // Updated path
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles', error.response ? error.response.data : error.message);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="articles-list-container">
      <h1 className="articles-list-title">Articles</h1>
      {articles.length > 0 ? (
        articles.map(article => (
          <div key={article._id} className="article-item">
            <h2 className="article-title">{article.title}</h2>
            <button className="read-more-button" onClick={() => navigate(`/articles/${article._id}`)}>Read More</button>
          </div>
        ))
      ) : (
        <p className="no-articles">No articles available.</p>
      )}
    </div>
  );
};

export default ArticlesList;

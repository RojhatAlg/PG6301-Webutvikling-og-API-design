// src/Components/ArticlesList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles', error.response ? error.response.data : error.message);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {articles.length > 0 ? (
        articles.map(article => (
          <div key={article._id} style={{ marginBottom: '1em' }}>
            <h2>{article.title}</h2>
            <button onClick={() => navigate(`/article/${article._id}`)}>Read More</button>
          </div>
        ))
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default ArticlesList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h1>My Articles</h1>
      {articles.map(article => (
        <div key={article._id} style={{ marginBottom: '20px' }}>
          <h2>{article.title}</h2>
          <button onClick={() => navigate(`/admin/edit-article/${article._id}`)}>Edit</button>
          <button onClick={() => handleDelete(article._id)}>Delete</button>
          <button onClick={() => handleDetailsClick(article)}>See Details</button>
          {selectedArticle && selectedArticle._id === article._id && (
            <div 
              style={{ 
                border: '1px solid #ddd', 
                padding: '10px', 
                marginTop: '10px', 
                maxWidth: '100%', 
                overflow: 'auto'
              }}
            >
              <p><strong>Category:</strong> {selectedArticle.category}</p>
              <p><strong>Text:</strong> {selectedArticle.text}</p>
              <button onClick={handleCloseDetails}>Close</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyArticles;

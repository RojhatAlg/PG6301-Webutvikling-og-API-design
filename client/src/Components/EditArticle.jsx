import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditArticle.css'; 

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({ title: '', category: '', text: '' });
  const [showPopup, setShowPopup] = useState(false); 
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
      await axios.put(`http://localhost:5000/admin-articles/${id}`, article, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate('/admin/my-articles');
      }, 3000);

    } catch (error) {
      console.error('Error updating article', error.response ? error.response.data : error.message);
    }
  };

  const handleClose = () => {
    navigate('/admin/my-articles');
  };

  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">Edit Article</h1>
      
      {showPopup && (
        <div className="success-popup">
          Article successfully updated
        </div>
      )}

      <form onSubmit={handleUpdate} className="edit-article-form">
        <input
          type="text"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
          required
          className="edit-article-input"
          placeholder="Title"
        />
        <select
          value={article.category}
          onChange={(e) => setArticle({ ...article, category: e.target.value })}
          required
          className="edit-article-select"
        >
          <option value="News">News</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <textarea
          value={article.text}
          onChange={(e) => setArticle({ ...article, text: e.target.value })}
          required
          className="edit-article-textarea"
          placeholder="Article text"
        ></textarea>
        <button type="submit" className="edit-article-button">Update Article</button>
      </form>

      <button className="close-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default EditArticle;

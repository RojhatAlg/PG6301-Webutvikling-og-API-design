import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateArticle.css';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/admin-articles', 
        { title, category, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setCategory('');
      setText('');
      setSuccessMessage('Article created successfully!');
      setTimeout(() => {
        navigate('/admin/my-articles');
      }, 2000); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.msg);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      } else {
        console.error('Error creating article', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleClose = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="create-article-container">
      <h1 className="create-article-title">Create Article</h1>
      {showError && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="create-article-form">
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            className="form-select"
          >
            <option value="">Select a category</option>
            <option value="Sport">Sport</option>
            <option value="News">News</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Text:</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required 
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="create-article-button">Create Article</button>
      </form>
      <button className="close-button" onClick={handleClose}>Close</button>
    </div>
  );
};

export default CreateArticle;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateArticle.css'; // Import the CSS file

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/articles', 
        { title, category, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Clear the form and show success message
      setTitle('');
      setCategory('');
      setText('');
      alert('Article created successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.msg);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000); // Hide message after 3 seconds
      } else {
        console.error('Error creating article', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleClose = () => {
    navigate('/admin/dashboard'); // Navigate to the homepage or ArticlesList
  };

  return (
    <div className="create-article-container">
      <h1 className="create-article-title">Create Article</h1>
      {showError && <div className="error-message">{errorMessage}</div>}
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
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            className="form-input"
          />
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

import React, { useState } from 'react';
import axios from 'axios';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

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

  return (
    <div>
      <h1>Create Article</h1>
      {showError && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Category:</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Text:</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required 
          ></textarea>
        </div>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate(); // Bruk useNavigate her

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/articles', { title, category, text, imageUrl }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      navigate('/admin'); // Bruk navigate for å navigere etter artikkelopprettelse
    } catch (error) {
      console.error('Error creating article', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select category</option>
        <option value="news">News</option>
        <option value="events">Events</option>
        {/* Add more categories as needed */}
      </select>
      <textarea placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <button type="submit">Create Article</button>
    </form>
  );
};

export default CreateArticle;

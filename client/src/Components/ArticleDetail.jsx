// src/Components/ArticleDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

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

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>Category: {article.category}</p>
      <p>{article.text}</p>
      <p>Author: {article.author.name}</p>
    </div>
  );
};

export default ArticleDetail;

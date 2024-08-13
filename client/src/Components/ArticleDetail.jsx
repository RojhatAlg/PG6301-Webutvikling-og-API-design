import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>Category: {article.category}</p>
      <p>{article.text}</p>
      <p>Posted by: {article.author.username}</p>
    </div>
  );
};

export default ArticleDetail;

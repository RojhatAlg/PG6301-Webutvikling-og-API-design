//Admin får en velkomst
//Admin kan velge å se nyhetsartikler, deretter velge å se detaljer per nyhetsartikkel (overskrift, navn, bilde)
//Admin kan velge å se sin egen profilside med bruker info + artikler brukeren har opprettet
//Admin kan velge å opprette en artikkel (bruker skal forhindres fra å sende en nyhetsartikkel som mangler kategori, tittel, tekst)
//bAdmin skal kunne redigere en artikkel de selv har publisert
//Admin skal kunne slette en artikkel de selv har publisert

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.category}</p>
            <p>{article.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

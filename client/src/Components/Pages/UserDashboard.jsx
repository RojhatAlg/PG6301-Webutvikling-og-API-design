//bruker får en velkomst
//bruker kan se sin profilside med profil info
//bruker kan velge å se nyhetsartikler
//brukere kan lese nyhetsartikklene ved å trykke på "les mer" og deretter "vis detaljer" for å se titel, navn og bilde på den som publiserte artikkelen

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
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
      <h1>User Dashboard</h1>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <Link to={`/articles/${article._id}`}>Read more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;

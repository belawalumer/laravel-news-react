import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OpenNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Open News</h2>
      {articles.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
}

export default OpenNews;

import React from "react";
import { useState, useEffect } from "react";

import Loader from "../compnents/Loader";
import { getNews } from "../api/external";
import "./Home.css";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApiCalls() {
      const response = await getNews();
      setArticles(response);
    })();

    // Cleanup function
    return () => {
      setArticles([]);
    };
  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };
  if (articles.length == 0) {
    return <Loader text="homepage" />;
  }

  return (
    <>
      <div className="homeHeader">Latest Articles</div>
      <div className="grid">
        {articles.map((article) => (
          <div
            className="card"
            key={article.url}
            onClick={() => handleCardClick(article.url)}
          >
            <img src={article.urlToImage} alt={article.title} />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

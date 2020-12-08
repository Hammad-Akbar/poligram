import React, { useState } from 'react';
import './styles/news.css';
import Socket from './Socket';

function NewsSearch() {
  const [news, setNews] = useState('');

  function handleChange(e) {
    setNews(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Socket.emit('search news', news);
    setNews('');
  }

  return (
    <body>
      <section id="section-red">
        {' '}
        <div className="slogan-white"> Explore the news and trending topics </div>
        {' '}
      </section>
      <div className="news-form">
        <form className="newsForm" onSubmit={handleSubmit}>
          <input
            className="search-news"
            type={news}
            onChange={handleChange}
            value={news}
            placeholder="Search for news.."
            required
          />
          <button className="newsbutton" type="submit">Search</button>
        </form>
      </div>
    </body>
  );
}

export default NewsSearch;

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
    <h1 className="news-title"> Learn about what is happening today. </h1>
    <div className="news-form">
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
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

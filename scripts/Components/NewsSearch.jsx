import React, { useState } from 'react';
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
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          type={news}
          onChange={handleChange}
          value={news}
          placeholder="Search for news.."
          required
        />
        <button className="button" type="submit"> Search </button>
      </form>
    </div>
  );
}

export default NewsSearch;

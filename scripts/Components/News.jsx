import React, { useState, useEffect } from 'react';
import NewsSearch from './NewsSearch';
import Socket from './Socket';
import './styles/news.css';

function News() {
  const [newsData, setNewsData] = useState([]);
  const [trendNews, setTrendNews] = useState([]);
  useEffect(() => {
    Socket.emit('news api call');

    Socket.on('newsData', (data) => {
      setNewsData(data.newsObjectLst);
    });
    Socket.on('trendNews', (data) => {
      setTrendNews(data.TrendnewsLst);
    });

    return () => {
      Socket.off('newsData');
      Socket.off('trendNews');
    };
  }, []);

  return (
    <div>
      <NewsSearch />
      <div>
        <table className="tabStyle">
          <tr>
            {trendNews.map((newz) => (
              <th>
                <p>
                  <div className="container">
                  <img src={newz.img} alt="" width="650" height="300" />
                  <div class="content">
                    <h1><a className="trend-link" href={newz.url} target="_blank" rel="noopener noreferrer">{newz.title}</a></h1>
                    </div>
                  </div>
                  <br />
                </p>
              </th>
            ))}
          </tr>
        </table>
      </div>
      {newsData.map((news) => (
        <p>
          <div className="horizontal-line" />
          <br />
          <div className="news">
            <div className="row">
              <div className="column"><img src={news.img} alt="" width="650" height="300" /></div>
              <div className="column">
                <h2 className="headerclass">
                  <a href={news.url} target="_blank" rel="noopener noreferrer">{news.title}</a>
                </h2>
                <p>
                  {news.content}
                </p>
              </div>
            </div>
            <br />
          </div>
        </p>
      ))}
    </div>
  );
}

export default News;

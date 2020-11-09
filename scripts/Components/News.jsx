import React, { useState, useEffect } from 'react'
import Socket from './Socket'


function News () {

    console.log('ON NEWS PAGE')


    const [newsData, setNewsData] = useState([]);
   
    useEffect(() => {
        Socket.emit('news api call')

        Socket.on('newsData', (data) => {
            setNewsData(data.newsObjectLst)
        })

        return () => {
            Socket.off('newsData')
        }

    }, [])

    const news = newsData.map((news) => (
        <p>
            {news.title}
            {news.author}
            {news.content}
            {news.published}
            {news.source}
            {news.url}
            {news.img}
        </p>
    ))

    return (
        <div>
            <h1>Recieved News titles</h1>
            {news}
        </div>
    );
}

export default News
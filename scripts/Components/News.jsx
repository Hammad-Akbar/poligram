import React, { useState, useEffect } from 'react'
import Socket from './Socket'
import './styles/dictionary.css'

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
            {news.title}<br></br>
            {news.author}<br></br>
            {news.content}<a href={news.url} target="_blank">Click Here</a><br></br>
            {news.published}<br></br>
            {news.source}<br></br>
            <img src={news.img}/><br></br>
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
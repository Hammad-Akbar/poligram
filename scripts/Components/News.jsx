import React, { useState, useEffect } from 'react'
import Socket from './Socket'
import './styles/news.css'

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
  

    return (
        <div>
            {newsData.map((news) => (
         <p>
            
             <div className='headerclass'>{news.title}</div><br/>
             
            <div className="row">
                <div className="column"><p>Article: {news.content}<a href={news.url} target="_blank">Click Here</a></p>
                   <p>Written by: {news.author}</p> 
                    <p>Posted by: {news.source}</p>
                </div>
                
                <div className="column"><img src={news.img} width="300" height="300"/></div>
                
            </div><br/>
            
            
            
         </p>
         
            ))}
        </div>
    );
}

export default News
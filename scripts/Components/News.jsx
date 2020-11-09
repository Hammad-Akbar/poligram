import React, { useState, useEffect } from 'react'
import Socket from './Socket'


function News () {

    console.log('ON NEWS PAGE')


    const [title, setTitle] = useState([]);
    const[author, setAuthor] = useState([]);
    const[content, setContent] = useState([]);
    const[source, setSource] = useState([]);
    const[link, setLink] = useState([]);
    const[imglink, setImglink] = useState([]);
   
    useEffect(() => {
        Socket.emit('news api call')

        Socket.on('newsData', (data) => {
            console.log(data)
            setTitle(data['title'])
            setContent(data['content'])
            setAuthor(data['author'])
            setSource(data['source'])
            setImglink(data['img'])
            setLink(data['link'])
        })

        return () => {
            Socket.off('newsData')
        }

    }, [])
    

    return (
        <div>
            <h1>Recieved News titles</h1>
            {title}
            {content}
            {author}
            {source}
            {imglink}
            {link}
        </div>
    );
}

export default News
import React, { useState, useEffect } from 'react'
import Socket from './Socket'
import './styles/dictionary.css'

function News () {

    const [title, setTitle] = useState([]);
    const[author, setAuthor] = useState([]);
    const[content, setContent] = useState([]);
    const[source, setSource] = useState([]);
    const[link, setLink] = useState([]);
    const[imglink, setImglink] = useState([]);
   
    useEffect(() => {
        Socket.on('newsData', (data) => {
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
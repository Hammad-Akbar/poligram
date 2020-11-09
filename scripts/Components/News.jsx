import React, { useState, useEffect } from 'react'
import Socket from './Socket'
import './styles/dictionary.css'

function News () {

    const [news, setNews] = useState([]);
    // const[author, setAuthor] = useState([]);
    // const[content, setContent] = useState([]);
    // const[source, setSource] = useState([]);
    // const[link, setLink] = useState([]);
    // const[imglink, setImglink] = useState([]);
   
    useEffect(() => {
            Socket.on('newsData', (data) => {
              console.log("Received a news title from server: " + data);
                setNews(data);
             })
         }, []);
    
    
    //  //function getTitles() {
    //     useEffect(() => {
    //         Socket.on('newsData', (data) => {
    //           console.log("Received a news title from server: " + data['title']);
    //             setTitle(data['title']);
    //          })
    //      });
    // // }
    
    //  function getAuthor() {
    //     useEffect(() => {
    //          Socket.on('newsData', (data) => {
    //          console.log("Received a news author from server: " + data['author']);
    //             setAuthor(data['author']);
    //          })
    //      });
    //  }
    
    //  function getcontent() {
    //      useEffect(() => {
    //          Socket.on('newsData', (data) => {
    //              console.log("Received a news content from server: " + data['content']);
    //              setContent(data['content']);
    //          })
    //      });
    //  }
    
    //  function getsource() {
    //      useEffect(() => {
    //          Socket.on('newsData', (data) => {
    //              console.log("Received a news content from server: " + data['source']);
    //              setSource(data['source']);
    //          })
    //      });
    //  }
    
    //  function getlink() {
    //      useEffect(() => {
    //          Socket.on('newsData', (data) => {
    //              console.log("Received a news content from server: " + data['link']);
    //             setLink(data['link']);
    //          })
    //   });
    // }
    
    //  function getimagelink() {
    //   useEffect(() => {
    //         Socket.on('newsData', (data) => {
    //           console.log("Received a news content from server: " + data['img']);
    //              setImglink(data['img']);
    //       })
    //   });
    //  }
    
    // //getTitles();
    // getAuthor();
    // getcontent();
    // getsource();
    // getlink();
    // getimagelink();
    
    // {title.map()}
    //         {content}
    //         {author}
    //         {source}
    //         {imglink}
    //         {link}
    

    return (
        <div>
            <h1>Recieved News titles</h1>
            {news.map(newss => (
        <p>{newss.author}</p>
      ))}
            
        </div>
    );
}

export default News
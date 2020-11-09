import React, { useState, useEffect } from 'react'
import Socket from './Socket'
import './styles/dictionary.css'

function News () {

    const [title, setTitle] = React.useState([]);
    const[author, setAuthor] = React.useState([]);
    const[content, setContent] = React.useState([]);
    const[source, setSource] = React.useState([]);
    const[link, setLink] = React.useState([]);
    const[imglink, setImglink] = React.useState([]);
   
    
    
    
     function getTitles() {
        React.useEffect(() => {
            Socket.on('newsData', (data) => {
               console.log("Received a news title from server: " + data['title']);
                setTitle(data['title']);
             })
         });
     }
    
     function getAuthor() {
        React.useEffect(() => {
             Socket.on('newsData', (data) => {
             console.log("Received a news author from server: " + data['author']);
                setAuthor(data['author']);
             })
         });
     }
    
     function getcontent() {
         React.useEffect(() => {
             Socket.on('newsData', (data) => {
                 console.log("Received a news content from server: " + data['content']);
                 setContent(data['content']);
             })
         });
     }
    
     function getsource() {
         React.useEffect(() => {
             Socket.on('newsData', (data) => {
                 console.log("Received a news content from server: " + data['source']);
                 setSource(data['source']);
             })
         });
     }
    
     function getlink() {
         React.useEffect(() => {
             Socket.on('newsData', (data) => {
                 console.log("Received a news content from server: " + data['link']);
                setLink(data['link']);
             })
       });
    }
    
     function getimagelink() {
       React.useEffect(() => {
            Socket.on('newsData', (data) => {
               console.log("Received a news content from server: " + data['img']);
                 setImglink(data['img']);
           })
       });
     }
    
    getTitles();
    getAuthor();
    getcontent();
    getsource();
     getlink();
    getimagelink();
    

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
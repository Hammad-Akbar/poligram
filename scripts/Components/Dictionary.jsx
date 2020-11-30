import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Socket from './Socket';
import './styles/dictionary.css';

function Dictionary() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    Socket.emit('word of the day');
    Socket.on('forward message', (data) => {
      setMessage(data.messageReceived);
    });
    return () => {
      Socket.off('forward message');
    };
  }, []);

  function toggleParagraph() {
    if (message === '') {
      return null;
    }
    return (
      <>
        <p className="definition">
          <strong>Definition: </strong>
          {message}
        </p>
      </>
    );
  }

  return (
    <div className="dictionary">
      <SearchBar />
      <div>
        {toggleParagraph()}
      </div>
    </div>
  );
}

export default Dictionary;

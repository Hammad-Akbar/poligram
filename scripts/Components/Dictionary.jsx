import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Socket from './Socket';
import './styles/dictionary.css';

function Dictionary() {
  const [message, setMessage] = useState('');
  const [wordOfDay, setWordOfDay] = useState('');
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    Socket.emit('word of the day');
    Socket.on('forward message', (data) => {
      setMessage(data.messageReceived);
    });
    Socket.on('send word of day', (data) => {
      setDefinition(data.messageReceived);
      setWordOfDay(data.wordOfDay);
    });
    return () => {
      Socket.off('forward message');
      Socket.off('send word of day');
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
    <div>
      <section id="section-red">
        {' '}
        <div className="slogan-white"> Discover and learn new words </div>
        {' '}
      </section>
      <div className="dictionary">
        <div className="wordOfDayCard">
          <div className="wordOfDay">
            <strong> Word of the day: </strong>
            {wordOfDay}
          </div>
          <br />
          <div className="wordDefinition">
            {definition}
          </div>
        </div>
        <SearchBar />
        <div>
          {toggleParagraph()}
        </div>
      </div>
    </div>
  );
}

export default Dictionary;

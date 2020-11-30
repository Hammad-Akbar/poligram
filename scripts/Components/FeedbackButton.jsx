import * as React from 'react';
import Socket from './Socket';
import './styles/home.css'

function handleSubmit(event) {
  const newName = document.getElementById('name_input');
  const newFeedback = document.getElementById('message_input');
  
  Socket.emit('new feedback', {
    name: newName.value,
    feedback: newFeedback.value,
  });
  
  newName.value = '';
  newFeedback.value = '';

  event.preventDefault();
}

export default function FeedbackButton() {
  return (
    <div className='feedback-button'>
        <form onSubmit={handleSubmit}>
          <div className='name-box'>
            <label for="name_input">Name:</label><br></br>
            <input type="text" id="name_input" name="name_input" /><br></br>
          </div>
          <div className='message-box'> 
            <label for="message">Feedback:</label><br></br>
            <textarea id="message" name="message" rows="4" cols="50"> </textarea>
          </div>
          <button type="submit">Give Feedback</button>
        </form>
    </div>
  );
}

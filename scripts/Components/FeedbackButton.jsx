import * as React from 'react';
import Socket from './Socket';
import './styles/home.css'

function handleSubmit(event) {
  const newName = document.getElementById('name_input');
  Socket.emit('new feedback name', {
    feedback: newName.value,
  });

  newName.value = '';
  
  const newFeedback = document.getElementById('message_input');
  Socket.emit('new feedback message', {
    name: newFeedback.value,
  });

  newFeedback.value = '';

  event.preventDefault();
}

export default function FeedbackButton() {
  return (
    <div className='feedback-button'>
        <form onSubmit={handleSubmit}>
          <label for="name_input">Name:</label><br></br>
          <input type="text" id="name_input" name="name_input" /><br></br>
          <input type="text" id="message_input" name="message_input" /><br></br>
          <button type="submit">Give Feedback</button>
        </form>
    </div>
  );
}

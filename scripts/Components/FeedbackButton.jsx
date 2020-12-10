import * as React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Socket from './Socket';
import './styles/home.css';

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

function alertSubmit(count) {
  if (count > 1000) {
    Swal.fire({ icon: 'error', text: 'Character Limit Exceeded' });
  }
}

function checkButton(count) {
  if (count > 1000) {
    return true;
  }
  if (count === 0) {
    return true;
  }

  return false;
}

export default function FeedbackButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="feedback-button">
      <form onSubmit={handleSubmit}>
        <div className="name-box">
          <label htmlFor="name_input">Name:</label>
          <br />
          <input type="text" id="name_input" name="name_input" />
          <br />
        </div>
        <br />
        <div className="message-box">
          <label htmlFor="message">Feedback:</label>
          <br />
          <textarea
            id="message"
            name="message"
            rows="6"
            cols="50"
            onChange={(e) => setCount(e.target.value.length)}
          />
        </div>
        <h6>
          {count}
          /1000 characters
        </h6>
        <button disabled={checkButton(count)} onClick={alertSubmit(count)} type="submit">Give Feedback</button>
      </form>
    </div>
  );
}

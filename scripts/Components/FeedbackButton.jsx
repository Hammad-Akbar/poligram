import * as React from 'react';
import Socket from './Socket';
import './styles/home.css'

function handleSubmit(event) {
  const newFeedback = document.getElementByTagName('button_clicked');
  Socket.emit('new feedback', {
    clicked: "clicked",
  });

  event.preventDefault();
}

export default function FeedbackButton() {
  return (
    <div className='feedback-button'>
        <form onSubmit={handleSubmit}>
            <button type="submit">Give Feedback</button>
        </form>
    </div>
  );
}

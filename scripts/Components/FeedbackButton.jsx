import * as React from 'react';
import Socket from './Socket';

function handleSubmit(event) {
  const newFeedback = document.getElementByTagName('button_clicked');
  Socket.emit('new feedback', {
    clicked: "clicked",
  });

  event.preventDefault();
}

export default function FeedbackButton() {
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Give Feedback</button>
    </form>
  );
}

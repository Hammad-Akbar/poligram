import React from 'react';

import Question from './Question';
import Socket from '../Socket';
import Swal from 'sweetalert2';

// max values of each classification
const cutoffs = {
  0: 'neutral',
  10: 'slightly',
  20: 'moderately',
  30: 'very',
  999: 'extremely',
};

const num_questions = 13;

function Quiz() {
  const [display, setDisplay] = React.useState(null);

  React.useEffect(() => {
    Socket.on('quiz generated', (data) => {
      const questions = data.map((question, i) => {
        let bgColor;
        if (i % 2 === 0) {
          bgColor = 'white';
        } else {
          bgColor = '#D3D3D3';
        }

        return (
          <div style={{ padding: '1em', background: bgColor }}>
            <Question text={question.text} multiplier={question.multiplier} index={i} />
          </div>
        );
      });

      setDisplay(
        <div>
          <form onSubmit={submitQuiz}>
            <div style={{ margin: '2em', border: 'solid' }}>
              {questions}
            </div>
            <button style={{ marginBottom: '3em' }}>Submit quiz</button>
          </form>
        </div>,
      );
    });
    
    Socket.on('save quiz response', (data) => {
      if (data["message"] == "user not logged in") {
        Swal.fire({icon: 'warning', text: 'Please log in before saving your quiz result.'});
      } else if (data["message"] == "success") {
        Swal.fire({icon: 'success', text: 'Score saved successfully!'});
      }
    });
    
    Socket.on('prev quiz result', (data) => {
      if (data["message"] == "user not logged in") {
        Swal.fire({icon: 'warning', text: 'Please log in before saving your quiz result.'});
      } else if (data["message"] == "no record found") {
        Swal.fire({icon: 'warning', text: "You don't seem to have a previous result. Make sure you save your result to compare!"});
      } else if (data["message"] == "success") {
        let score = data["score"];
        
        let prevDescriptor = convertScoreToDescription(score);
        Swal.fire({text: "Your previous result was: " + prevDescriptor});
      }
    });

    return () => {
      Socket.off('quiz generated');
      Socket.off('save quiz response');
      Socket.off('prev quiz result');
    };
  });

  function convertScoreToDescription(score) {
    let ideology;
    let descriptor;
    let score_abs;

    if (score < 0) {
      ideology = 'conservative';
      score_abs = score * -1;
    } else if (score > 0) {
      ideology = 'liberal';
      score_abs = score;
    } else {
      ideology = '';
      score_abs = score;
    }

    for (const cutoff in cutoffs) {
      if (score_abs <= cutoff) {
        descriptor = cutoffs[cutoff];
        break;
      }
    }
    
    return descriptor + " " + ideology;
  }

  function generateQuiz() {
    Socket.emit('request quiz');
  }
  
  function saveQuiz(score) {
    Socket.emit('save quiz', score);
  }

  function showPrevResult() {
    Socket.emit('request prev quiz result');
  }

  function submitQuiz(event) {
    event.preventDefault();

    let score = 0;
    let counter = 0;
    for (const radio of event.target) {
      if (radio.checked) {
        const multiplier = radio.name.substring(radio.name.indexOf(',') + 1);
        score += multiplier * radio.value;
        counter++;
      }
    }

    if (counter < num_questions) {
      Swal.fire({icon: 'error', text: 'Please answer all questions before submitting'});
      return;
    }

    let descriptor = convertScoreToDescription(score);

    setDisplay(
      <div>
        <h2>You are {descriptor}</h2>
        <button onClick={() => saveQuiz(score)}>Save result</button>
        <br />
        <button onClick={showPrevResult}>Show previous result</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Ideology Quiz</h2>
      <button onClick={generateQuiz}>Generate new quiz</button>
      {display}
    </div>
  );
}

export default Quiz;

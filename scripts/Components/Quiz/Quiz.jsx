import React from 'react';

import Swal from 'sweetalert2';
import Question from './Question';
import Socket from '../Socket';
import './quiz.css';

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
            <div style={{ margin: '20px', border: '1px solid' }}>
              {questions}
            </div>
            <div className="quiz-button">
              {' '}
              <button style={{ marginBottom: '3em' }}>Submit quiz</button>
              {' '}
            </div>
          </form>
        </div>
        ,
      );
    });

    Socket.on('save quiz response', (data) => {
      if (data.message === 'user not logged in') {
        Swal.fire({ icon: 'warning', text: 'Please log in before saving your quiz result.' });
      } else if (data.message === 'success') {
        Swal.fire({ icon: 'success', text: 'Score saved successfully!' });
      }
    });

    Socket.on('prev quiz result', (data) => {
      if (data.message === 'user not logged in') {
        Swal.fire({ icon: 'warning', text: 'Please log in before saving your quiz result.' });
      } else if (data.message === 'no record found') {
        Swal.fire({ icon: 'warning', text: "You don't seem to have a previous result. Make sure you save your result to compare!" });
      } else if (data.message === 'success') {
        const { score } = data;

        const prevDescriptor = convertScoreToDescription(score);
        Swal.fire({ text: `Your previous result was: ${prevDescriptor}` });
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

    return `${descriptor} ${ideology}`;
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
      Swal.fire({ icon: 'error', text: 'Please answer all questions before submitting' });
      return;
    }

    const descriptor = convertScoreToDescription(score);

    setDisplay(
      <div>
        <div className="slogan-description-black3">
          <p>
            You are
            <strong>
              {' '}
              {descriptor}
              {' '}
            </strong>
          </p>
        </div>
        <div className="quiz-button">
          {' '}
          <button onClick={() => saveQuiz(score)}>Save result</button>
          {' '}
        </div>
        <br />
        <div className="quiz-button">
          {' '}
          <button onClick={showPrevResult}>Show previous result</button>
          {' '}
        </div>
        <div className="row">
          <div className="leftcolumn">
            <div className="card">
              <p>
                {' '}
                <strong> Liberal </strong>
                {' '}
              </p>
              {/* eslint-disable-next-line react/no-unescaped-entities,max-len */}
              <p> A person who is 'liberal' is one that is a supporter of policies that are socially progressive and promote social welfare. </p>
              <br />
              <p>
                {' '}
                <strong> Conservative </strong>
                {' '}
              </p>
              {/* eslint-disable-next-line react/no-unescaped-entities,max-len */}
              <p> A person who is 'conservative' is one that is averse to change and holds traditional values. </p>
            </div>
          </div>
          <div className="rightcolumn">
            <div className="card">
              <p>
                {' '}
                {/* eslint-disable-next-line max-len */}
                <strong> This quiz will show how strongly you identify with a certain ideology. </strong>
                {' '}
              </p>
              <p>
                {' '}
                <em> extremely: </em>
                {' '}
                Your views are sharp and heavy towards one side of the ideological spectrum.
                {' '}
              </p>
              <p>
                {' '}
                <em> very: </em>
                {' '}
                Your views fall strongly on one side of the ideological spectrum.
                {' '}
              </p>
              <p>
                {' '}
                <em> moderately: </em>
                {' '}
                {/* eslint-disable-next-line max-len */}
                Your views on a broad range of issues but lean more towards one side of the ideological spectrum.
                {' '}
              </p>
              <p>
                {' '}
                <em> slightly: </em>
                {' '}
                {/* eslint-disable-next-line max-len */}
                Your views lean toward one side of the ideological spectrum, but not very strongly and you likely hold some opposing views as well.
                {' '}
              </p>
              <p>
                {' '}
                <em> neutral: </em>
                {' '}
                {/* eslint-disable-next-line max-len,react/no-unescaped-entities */}
                Your views are evenly spread across the ideological spectrum and don't lean towards one side.
              </p>
            </div>
          </div>
        </div>
      </div>,
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <section id="section-red">
        {' '}
        <div className="slogan-white"> Take an ideology Quiz and Learn where you stand </div>
        {' '}
      </section>
      <section id="section-white">
        <div className="slogan-black"> What is an ideology? </div>
        <div className="slogan-description-black2"> An ideology is the science of ideas! Basically it is a set of beliefs or philosophies attributed to a person or group of persons </div>
        <div className="slogan-description-black2"> Take the quiz and find out where you stand! </div>
      </section>
      <div className="quiz-button">
        {' '}
        <button onClick={generateQuiz}>Generate new quiz</button>
        {' '}
      </div>
      <div className="horizontal-line" />
      {display}
    </div>
  );
}

export default Quiz;

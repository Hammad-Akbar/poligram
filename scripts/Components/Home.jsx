import React from 'react';
import FeedbackButton from './FeedbackButton';
import Carousel from './InfoCards';
import Socket from './Socket';
import './styles/home.css';

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [feedback, setFeedback] = React.useState('');

  function getFeedback() {
    React.useEffect(() => {
      Socket.on('feedback sent', (data) => {
        setFeedback(data);
      });
      return () => {
        Socket.off('feedback sent');
      };
    });
  }

  getFeedback();

  return (
    <body>
      <section id="section-red">
        <div className="heading"> Poligram </div>
        <div className="slogan-white"> The politics handbook for everyone. </div>
        <div className="slogan-description-white">
          {/* eslint-disable-next-line max-len */}
          With politics more important than ever, Poligram makes it easy to learn. Poligram will provide an interactive way to learn about politics in America.
        </div>
      </section>
      <div className="horizontal-line-home" />
      <section id="section-white">
        <div className="slogan-black"> Features </div>
        <div className="slogan-description-black"> Poligram will feature a way to learn about new political words, take meaningful quizzes to test your knowledge, and keep up with current issues in the news.  </div>
        <div className="box">
          <div>
            <div className="section-heading"> News </div>
            <div className="section-description"> Keep up with news and current events related to politics! </div>
          </div>
          <div>
            <div className="section-heading"> Dictionary </div>
            <div className="section-description"> Search up political words that you do not understand! </div>
          </div>
          <div>
            <div className="section-heading"> Quiz </div>
            <div className="section-description"> Take a quiz and discover your political ideology! </div>
          </div>
          <div>
            <div className="section-heading"> Map </div>
            <div className="section-description"> Discover information about every state! </div>
          </div>
        </div>
      </section>
      <div className="horizontal-line-home" />
      <section id="section-blue">
        <div className="slogan-white">
          <span className="message">Meet the team!</span>
        </div>
        <div className="slogan-description-white2"> We are a group of people who want to put an emphasis on politics. </div>
        <Carousel />
        <br />
        <br />
        <br />
      </section>
      <div className="horizontal-line-home" />
      <section id="section-red">
        <div className="slogan-white">
          <span className="message">Get in touch with us!</span>
        </div>
        <FeedbackButton />
      </section>
      <div className="horizontal-line-home" />
      <section id="section-white">
        <br />
        <div className="slogan-description-black2"> This app was created using technologies like React, Python-Flask, and PostgreSQL. Check out our GitHub repo by clicking the button below! </div>
        <div className="centerGit">
          {' '}
          <a href="https://github.com/AkhilSamarth/cs490-poligram-sprint2">
            {' '}
            <i className="fa fa-github w3-hover-opacity center" />
          </a>
          {' '}
        </div>
      </section>
    </body>
  );
}

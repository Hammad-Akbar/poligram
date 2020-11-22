import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dictionary from './Components/Dictionary';
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import LoginPage from './Components/LoginPage';
import Socket from './Components/Socket';
import Quiz from './Components/Quiz/Quiz';
import News from './Components/News';

const Content = () => {
  
  const [user, setUser] = useState('');

  useEffect(() => {
    Socket.on('new connection', (data) => {
      setUser(data.user);
    });

    return () => {
      Socket.off('new connection');
    };
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navigation user={user} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Dictionary" component={Dictionary} />
          <Route path="/Quiz" component={Quiz} />
          <Route path="/News" component={News} />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Content;

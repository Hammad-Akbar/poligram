import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dictionary from './Components/Dictionary'
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import LoginPage from './Components/LoginPage';
import Socket from './Components/Socket'

const Content = () => {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    Socket.on('new connection', (data) => {
      setUser(data.user);
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        Socket.close();
      });
    };
    
  }, [])


  function Authenticated () {
    if (isAuth) {
      return (
        <React.Fragment>
          <BrowserRouter>
            <div>
              <Navigation user={user} />
              <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/Dictionary" component={Dictionary}/>
                <Route component={Error}/>
              </Switch>
            </div> 
          </BrowserRouter>
        </React.Fragment>
      )
    }
    return(
      <React.Fragment>
        <LoginPage setIsAuth={setIsAuth} />
      </React.Fragment>
    )
  }

  return (
    <div>
      {Authenticated()}
    </div>
  )
}

export default Content
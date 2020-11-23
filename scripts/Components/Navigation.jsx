import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import LoginPage from './LoginPage'
import './styles/home.css';

const Navigation = ({ user }) => {
  
  const [isAuth, setIsAuth] = useState(false);

  function Authenticated() {
    if (isAuth) {
      return (
        <Router>
          <div className="topnav">
            <Link to="/">Home</Link>
            <Link to="/Dictionary">Dictionary</Link>
            <Link to="/Quiz">Quiz</Link>
            <Link to="/News">News</Link>
            <p>
              Welcome: 
              {user}
            </p>
          </div>
          <Switch>
          
            <Route exact path="/">
              <Home />
            </Route>
            
            <Route path="/Dictionary">
              <Redirect to="/Dictionary" />
            </Route>
            
            <Route path="/Quiz">
              <Redirect to="/Quiz" />
            </Route>
            
            <Route path="/News">
              <Redirect to="/News" />
            </Route>
            
          </Switch>
        </Router>
      )
    }
    return (
      <Router>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="/Dictionary">Dictionary</Link>
          <Link to="/Quiz">Quiz</Link>
          <Link to="/News">News</Link>
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          
          <Route path="/Dictionary">
            <Redirect to="/Dictionary" />
          </Route>
          
          <Route path="/Quiz">
            <Redirect to="/Quiz" />
          </Route>
          
          <Route path="/News">
            <Redirect to="/News" />
          </Route>
          
        </Switch>
      </Router>
    )
  }

  return(
    <div>
      {Authenticated()}
    </div>
  )
};

export default Navigation;

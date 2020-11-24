import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LoginPage from './LoginPage'
import './styles/home.css';

const Navigation = ({ user }) => {
  
  const [isAuth, setIsAuth] = useState(false);

  function Authenticated() {
    if (isAuth) {
      return (
        <>
          <div className="topnav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Dictionary">Dictionary</NavLink>
            <NavLink to="/Quiz">Quiz</NavLink>
            <NavLink to="/News">News</NavLink>
            <p>
              Welcome:
              {user}
            </p>
          </div>
        </>
      )
    }
    return (
      <>
        <>
          <div className="topnav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Dictionary">Dictionary</NavLink>
            <NavLink to="/Quiz">Quiz</NavLink>
            <NavLink to="/News">News</NavLink>
            <LoginPage setIsAuth={setIsAuth} />
          </div>
        </>
      </>
    );
  }
  return(
    <div>
      {Authenticated()}
    </div>
  )
};
export default Navigation;
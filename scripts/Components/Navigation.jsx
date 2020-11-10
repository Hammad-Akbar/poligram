import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/home.css';
 
const Navigation = ({user}) => {
    return (
        <div className='topnav'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Dictionary">Dictionary</NavLink>
            <NavLink to="/Quiz">Quiz</NavLink>
            <NavLink to="/News">News</NavLink>
            <p>Welcome: {user}</p>
        </div>
    );
};
 
export default Navigation;
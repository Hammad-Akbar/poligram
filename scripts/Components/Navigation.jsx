import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles/home.css'
 
const Navigation = () => {
    return (
        <div className='topnav'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Dictionary">Dictionary</NavLink>
            <NavLink to="/Quiz">Quiz</NavLink>
        </div>
    );
}
 
export default Navigation;
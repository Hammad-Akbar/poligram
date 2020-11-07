import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Dictionary">Dictionary</NavLink>
            <NavLink to="/Quiz">Quiz</NavLink>
        </div>
    );
}
 
export default Navigation;
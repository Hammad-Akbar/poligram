import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchBar from './Components/SearchBar'
import Socket from './Components/Socket'
import Dictionary from './Components/Dictionary'
import Home from './Components/Home';
import Navigation from './Components/Navigation';

const Content = () => {

    return (
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/Dictionary" component={Dictionary}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    )
}

export default Content
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dictionary from './Components/Dictionary'
import News from './Components/News'
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
            <Route path="/News" component={News}/>
            <Route component={Error}/>
          </Switch>
        </div> 
      </BrowserRouter>
    )
}

export default Content
import React from 'react';
import { Switch, Route } from 'react-router'

import HomePage from './pages/homePageComponent';
import AboutPage from './pages/aboutPageComponent';

class App extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" render={(props) =><HomePage {...props} /> }/>
                <Route exact path="/about" render={(props) =><AboutPage {...props} /> }/>
            </Switch>
        )
    }
}

export default App;
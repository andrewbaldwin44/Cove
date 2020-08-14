import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyles from "./GlobalStyles";

import Homepage from './Homepage';
import Header from './Header';
import FourOhFour from './FourOhFour';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route path='/'>
            <FourOhFour />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

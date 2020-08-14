import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyles from "./GlobalStyles";

import Homepage from './Homepage';
import Header from './Header';
import Login from './Login';
import FourOhFour from './FourOhFour';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
          <Route exact path='/users/log_in'>
            <Login accountCreated={true} />
          </Route>
          <Route exact path='/users/sign_up'>
            <Login accountCreated={false} />
          </Route>
          <Route path='/'>
            <FourOhFour />
          </Route>
        </Switch>
      </Main>
    </Router>
  )
}

const Main = styled.main`
  margin: 20px;
`;

export default App;

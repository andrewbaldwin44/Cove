import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyles from "./GlobalStyles";

import Homepage from './Homepage';
import Header from './Header';
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

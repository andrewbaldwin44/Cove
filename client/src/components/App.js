import React, { useContext   } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import GlobalStyles from "./GlobalStyles";

import Homepage from './Homepage';
import Header from './Header';
import Login from './Login/index';
import FourOhFour from './FourOhFour';

import { AuthenticationContext } from './AuthenticationContext';

function App() {
  const {
    message,
    setMessage,
  } = useContext(AuthenticationContext);

  const handleMessageClose = () => {
    setMessage(null);
  }

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
      {message && (
        <Snackbar
          open={message}
          autoHideDuration={2000}
          onClose={handleMessageClose}
        >
          <MuiAlert
            onClose={handleMessageClose}
            severity='error'
            variant='filled'
          >
            {message}
          </MuiAlert>
        </Snackbar>
      )}
    </Router>
  )
}

const Main = styled.main`
  margin: 20px;
`;

export default App;

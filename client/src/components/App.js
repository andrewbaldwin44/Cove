import React, { useContext   } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import GlobalStyles from "./GlobalStyles";

import Homepage from './Homepage';
import Login from './Login/index';
import Profile from './Profile';
import Room from './Room/index';
import TestCall from './TestCall';
import FourOhFour from './FourOhFour';

import { AuthenticationContext } from './AuthenticationContext';

const { v4: uuidv4 } = require('uuid');

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
          <Route exact path='/users/profile'>
            <Profile />
          </Route>
          <Route exact path='/rooms/room/:roomID'>
            <Room />
          </Route>
          <Route exact path='/test_call'>
            <Redirect from='/test_call' to={`/test_call/${uuidv4()}`} />
          </Route>
          <Route exact path='/test_call/:roomID'>
            <TestCall />
          </Route>
          <Route path='/'>
            <FourOhFour />
          </Route>
        </Switch>
      {message && (
        <Snackbar
          open={Boolean(message)}
          autoHideDuration={5000}
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

export default App;

import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useSelector } from "react-redux";

import GlobalStyles from "./GlobalStyles";

import Homepage from './Homepage/index';
import Login from './Login/index';
import Profile from './Profile/index';
import Room from './Room/index';
import DeezerAuthenticated from './DeezerAuthenticated';
import FourOhFour from './FourOhFour';

import { useDispatch } from "react-redux";
import { changeTheme } from '../actions';

import { AuthenticationContext } from './AuthenticationContext';
import { isContainingData } from '../utils/index';
import { themes } from '../themes';

function App() {
  const {
    userData,
    message,
    setMessage,
  } = useContext(AuthenticationContext);

  const dispatch = useDispatch();

  const colors = useSelector(state => state.theme.colors);

  useEffect(() => {
    if (isContainingData(userData)) {
      const { selectedTheme } = userData;
      const themeColors = themes[selectedTheme].colors;

      if (selectedTheme !== 'default') dispatch(changeTheme(themeColors));
    }
  // eslint-disable-next-line
  }, [userData]);

  const handleMessageClose = () => {
    setMessage(null);
  }

  return (
    <Router>
      <GlobalStyles colors={colors} />
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
        <Route exact path='/cove/:roomID'>
          <Room />
        </Route>
        <Route exact path='/api/deezer_authenticated'>
          <DeezerAuthenticated />
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import AuthenticationProvider from './components/AuthenticationContext';

import App from './components/App';

import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <AuthenticationProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthenticationProvider>,
  document.getElementById('root')
);

import React, { createContext, useState, useEffect } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const AuthenticationContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAJsxWPJggGuH1ZsRt5wT1gO3onS4zF-P0",
  authDomain: "final-project-96d37.firebaseapp.com",
  databaseURL: "https://final-project-96d37.firebaseio.com",
  projectId: "final-project-96d37",
  storageBucket: "final-project-96d37.appspot.com",
  messagingSenderId: "268524372667",
  appId: "1:268524372667:web:14fdadaa80c76a09f7df9e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function createUserWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signInWithEmail(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function signInWithGoogle() {
  return firebase.auth().signInWithPopup(googleProvider);
}

const AuthenticationProvider = ({ children, signOut, user }) => {
  const [userData, setUserData] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [message, setMessage] = useState('');

  const handleSignOut = () => {
    signOut();
    setUserData(null);
  }

  useEffect(() => {
    if (user) {
      const { email } = user;

      setUserData({ email });
    }
  }, [user]);

  const retrieveClientID = () => {
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken(true)
        .then(idToken => setIdToken(idToken))
        .catch(error => setIdToken('unauthorized'));
    }
    else {
      setIdToken('unauthorized');
    }
  }

  firebase.auth().onAuthStateChanged(() => {
    retrieveClientID();
  });

  return (
    <AuthenticationContext.Provider
      value={{
        userData,
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        handleSignOut,
        idToken,
        message,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(AuthenticationProvider);

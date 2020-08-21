import React, { createContext, useState, useEffect } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import DefaultProfile from '../assets/images/default-profile.png';

import { isContainingData, toArray } from '../utils/index';

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

function sendUserData(userData) {
  return fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
}

function validateRoomMember(idToken, roomID) {
  return fetch('/users/rooms/validate_member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken, roomID }),
  })
    .then(response => response.json())
}

function createUserWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signInWithEmail(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function signInWithGoogle() {
  return firebase.auth().signInWithPopup(googleProvider);
}

function AuthenticationProvider({ children, signOut, user }) {
  const [userData, setUserData] = useState(null);
  const [userRooms, setUserRooms] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSignOut = () => {
    signOut();
    setUserData(null);
  }

  const retrieveClientID = () => {
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser.getIdToken(true)
    }
  }

  useEffect(() => {
    if (user) {
      let { email, displayName, photoURL, uid: userID } = user;

      if (!photoURL) photoURL = DefaultProfile;

      sendUserData({ email, displayName, photoURL, userID })
        .then(() => {
          setUserData({
            userID,
            email,
            displayName,
            photoURL,
            userID,
          })
        })
        .catch(({ message }) => setMessage(`We're sorry! ${message}`));
    }
    else if (user === null) {
      setUserData({});
    }
  }, [user]);

  useEffect(() => {
    let observer;

    if (isContainingData(userData)) {
      const { userID } = userData;

      const roomReference = firebase.firestore().collection('users').doc(userID);

      observer = roomReference.onSnapshot(snapshot => {
        if (userData) {
          const data = snapshot.data();
          const { ownedRooms = {}, participatingRooms = {} } = data;

          const allRooms = [...toArray(ownedRooms, 'keys'), ...toArray(participatingRooms, 'keys')];

          setUserRooms(allRooms);
        }
      });
    }
  }, [userData]);

  return (
    <AuthenticationContext.Provider
      value={{
        userData,
        userRooms,
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        handleSignOut,
        retrieveClientID,
        validateRoomMember,
        message,
        setMessage,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(AuthenticationProvider);

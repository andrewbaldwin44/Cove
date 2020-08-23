import React, { createContext, useState, useEffect } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import DefaultProfile from '../assets/images/default-profile.png';

import { isContainingData, toArray } from '../utils/index';
import {
  sendUserData,
  validateRoomMember,
  getRoomDetails,
} from '../utils/authenticationUtils';

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
const database = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function createUserWithEmail(email, password) {
  return firebaseAppAuth.createUserWithEmailAndPassword(email, password);
}

function signInWithEmail(email, password) {
  return firebaseAppAuth.signInWithEmailAndPassword(email, password);
}

function signInWithGoogle() {
  return firebaseAppAuth.signInWithPopup(googleProvider);
}

function AuthenticationProvider({ children, signOut, user }) {
  const [userData, setUserData] = useState(null);
  const [userRooms, setUserRooms] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSignOut = () => {
    signOut();
    setUserData(null);
  }

  const retrieveClientID = () => {
    if (firebaseAppAuth.currentUser) {
      return firebaseAppAuth.currentUser.getIdToken(true)
    }
  }

  const updateUserData = (userID, newData) => {
    const reference = database.collection('users').doc(userID);

    reference.update(newData);
  }

  useEffect(() => {
    if (user) {
      let { email, displayName, photoURL, uid: userID } = user;

      if (!photoURL) photoURL = DefaultProfile;

      sendUserData({ email, displayName, photoURL, userID })
        .then(response => response.json())
        .then(({ userData: { deezerID = null }}) => {
          setUserData({
            userID,
            deezerID,
            email,
            displayName,
            photoURL,
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

      const roomReference = database.collection('users').doc(userID);

      observer = roomReference.onSnapshot(snapshot => {
        const data = snapshot.data();
        const { ownedRooms = {}, participatingRooms = {} } = data;

        const allRooms = [...toArray(ownedRooms, 'keys'), ...toArray(participatingRooms, 'keys')];

        getRoomDetails(allRooms).then(({ roomDetails }) => setRoomDetails(roomDetails));
        setUserRooms(allRooms);
      });
    }

    return () => {
      if (observer) observer();
    }
  }, [userData]);

  return (
    <AuthenticationContext.Provider
      value={{
        userData,
        userRooms,
        roomDetails,
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        handleSignOut,
        retrieveClientID,
        validateRoomMember,
        message,
        setMessage,
        database,
        updateUserData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(AuthenticationProvider);

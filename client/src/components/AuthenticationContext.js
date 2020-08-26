import React, { createContext, useState, useEffect } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

import DefaultProfile from '../assets/images/default-profile.png';

import { isContainingData, toArray } from '../utils/index';
import {
  sendUserData,
  validateRoomMember,
  getRoomDetails,
} from '../utils/authenticationUtils';

import { DATABASE_PATHS, ERROR_MESSAGES } from '../constants';
const {
  USERS_PATH,
} = DATABASE_PATHS;
const { unknownError } = ERROR_MESSAGES;

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

  const updateUserDatabase = newData => {
    if (isContainingData(userData)) {
      const { userID } = userData;

      const userReference = database.collection(USERS_PATH).doc(userID);

      userReference.update(newData);
    }
  }

  const uploadFile = async file => {
    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);
    return fileRef.getDownloadURL();
  }

  const updateUserData = async (userID, snapshot) => {
    const data = snapshot.data();

    if (!data) return;

    const {
      displayName,
      email,
      deezerID = null,
      ownedRooms = {},
      participatingRooms = {},
      photoURL,
      selectedTheme = 'default',
    } = data;

    const newUserData = { userID, displayName, email, deezerID, photoURL, selectedTheme};
    const allRooms = [...toArray(ownedRooms, 'keys'), ...toArray(participatingRooms, 'keys')];

    const { roomDetails } = await getRoomDetails(allRooms);

    setUserRooms(roomDetails);
    setUserData(newUserData);
  }

  const observeUserData = (userID) => {
    const roomReference = database.collection(USERS_PATH).doc(userID);

    const observer = roomReference.onSnapshot(snapshot => updateUserData(userID, snapshot));

    return observer;
  }

  const processUserData = userID => {
    let { email, displayName, photoURL } = user;

    photoURL = photoURL || DefaultProfile;

    sendUserData({ email, displayName, photoURL, userID })
      .catch(({ message }) => setMessage(unknownError));
  }

  useEffect(() => {
    let userDataObserver;

    if (user) {
      const { uid: userID } = user;

      userDataObserver = observeUserData(userID);
      processUserData(userID);
    }
    else if (user === null) {
      setUserData({});
    }

    return () => {
      if (userDataObserver) userDataObserver();
    }
  // eslint-disable-next-line
  }, [user]);

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
        database,
        updateUserDatabase,
        uploadFile,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(AuthenticationProvider);

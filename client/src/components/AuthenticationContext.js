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

import { DATABASE_PATHS } from '../constants';
const {
  USERS_PATH,
} = DATABASE_PATHS;

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
    const fileUrl = await fileRef.getDownloadURL();
    const newUserData = { photoURL: fileUrl };

    updateUserDatabase(newUserData);
  }

  const updateUserRooms = snapshot => {
    const data = snapshot.data();
    const { ownedRooms = {}, participatingRooms = {} } = data;

    const allRooms = [...toArray(ownedRooms, 'keys'), ...toArray(participatingRooms, 'keys')];

    getRoomDetails(allRooms).then(({ roomDetails }) => setRoomDetails(roomDetails));
    setUserRooms(allRooms);
  }

  const observeParticipatingRooms = () => {
    let observer;

    if (isContainingData(userData)) {
      const { userID } = userData;

      const roomReference = database.collection('users').doc(userID);

      observer = roomReference.onSnapshot(updateUserRooms);
    }

    return observer;
  }

  const extractUserData = ({ userData }) => {
    const {
      userID,
      email,
      deezerID = null,
      selectedTheme = 'default',
      photoURL,
      displayName
    } = userData;

    setUserData({
      userID,
      deezerID,
      email,
      displayName,
      photoURL,
      selectedTheme,
    });
  }

  const processUserData = () => {
    let { email, displayName, photoURL, uid: userID } = user;

    photoURL = photoURL || DefaultProfile;

    sendUserData({ email, displayName, photoURL, userID })
    .then(extractUserData)
    .catch(({ message }) => setMessage(`We're sorry! ${message}`));
  }

  useEffect(() => {
    if (user) {
      processUserData();
    }
    else if (user === null) {
      setUserData({});
    }
  // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const participatingRoomsObserver = observeParticipatingRooms();

    return () => {
      if (participatingRoomsObserver) participatingRoomsObserver();
    }
  // eslint-disable-next-line
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

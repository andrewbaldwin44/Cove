'use strict';

const admin = require('firebase-admin');

const {
  isReturningUser,
  getRoomNumber,
} = require('../utils/authenticationUtils');

require('dotenv').config({path: '../.env'});

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  }),
  databaseURL: process.env.FB_DATABASE_URL,
});

const database = admin.database();

async function createUser(req, res) {
  const { email, displayName, photoURL, uid: userID } = req.body;
  const acceptedData = { email, displayName, photoURL };

  const givenName = displayName ? displayName : email;

  try {
    let message = '';
    if (await isReturningUser(userID, database)) {
      message = `Welcome back ${givenName}!`;
    }

    else {
      await database.ref(`appUsers/${userID}`).set(acceptedData);

      message = `Welcome ${givenName}!`
    }

    res.status(201).json({ status: 201, userData: acceptedData, message: message });

  }
  catch (error) {
    res.status(401).json({ status: 401, message: error });
  }
}

async function createNewRoom(req, res)  {
  const { roomName, uid: userID } = req.body;

  try {
    const roomNumber = await getRoomNumber(database);

    res.status(201).json({ status: 201, roomNumber });
  }
  catch ({ message }) {
    res.status(401).json({ status: 401, message });
  }
}

module.exports = {
  createUser,
  createNewRoom,
};

'use strict';

const admin = require('firebase-admin');

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
  const { email, displayName, photoURL, uid } = req.body;
  const acceptedData = { email, displayName, photoURL };

  await database.ref(`appUsers/${uid}`).set(acceptedData);

  res.status(201).json({
    status: 201,
    data: acceptedData,
    message: `Welcome ${displayName ? displayName : email}!`,
  });
};

module.exports = {
  createUser,
};

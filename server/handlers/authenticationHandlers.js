'use strict';

const admin = require('firebase-admin');

const {
  queryDatabase,
  writeDatabase,
  isReturningUser,
  getMemberIDs,
  createNewRoom,
  getUserID,
  getUserData,
  getRoomMembersData,
  getRoomDetails,
} = require('../utils/authenticationUtils');

const {
  getSearchResults,
  toArray,
} = require('../utils/index');

const {
  DATABASE_PATHS: {
    USERS_PATH,
    OWNED_ROOMS_PATH,
    ROOMS_PATH,
    ROOMS_MEMBERS_PATH,
  },
} = require('../constants');

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

const database = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

async function handleReturningUser(userID, acceptedData, message) {
  const userData = await getUserData(userID, database);

  const ownedRooms = userData.ownedRooms || {};
  const ownedRoomIDs = toArray(ownedRooms, 'keys');

  const participatingRooms = userData.participatingRooms || {};
  const participatingRoomIDs = toArray(participatingRooms, 'keys');

  const allUserRooms = [...participatingRoomIDs, ...ownedRoomIDs];

  const roomDetails = await getRoomDetails(ownedRoomIDs, database);

  return { ...acceptedData, rooms: allUserRooms, roomDetails };
}

async function handleNewUser(userID, acceptedData) {
  await writeDatabase(USERS_PATH, userID, acceptedData, database);
}

async function handleLogin(req, res) {
  let { email, displayName, photoURL, userID } = req.body;

  displayName = displayName ? displayName : email;

  let acceptedData = { email, displayName, photoURL };

  try {
    let message = '';

    if (await isReturningUser(userID, database)) {
      acceptedData = await handleReturningUser(userID, acceptedData, message);

      message = `Welcome ${displayName}!`;
    }
    else {
      await handleNewUser(userID, acceptedData);

      message = `Welcome back ${displayName}!`;
    }

    res.status(201).json({ status: 201, userData: acceptedData, message });
  }
  catch (error) {
    console.log(error)
    res.status(401).json({ status: 401, ...error });
  }
}

async function handleNewRoom(req, res)  {
  const { roomName, userID, selectedMembers } = req.body;

  try {
    const memberIDs = await getMemberIDs(selectedMembers, admin);

    const roomData = await createNewRoom(
      roomName,
      userID,
      memberIDs,
      database,
      FieldValue
    );

    res.status(201).json({ status: 201, ...roomData });
  }
  catch (error) {
    console.log(error)
    res.status(401).json({ status: 401, ...error });
  }
}

async function validateRoomMember(req, res) {
  const { idToken, roomID } = req.body;

  try {
    const userID = await getUserID(idToken, admin);
    const userData = await getUserData(userID, database);
    const roomMembersData = await getRoomMembersData(database);

    const { ownedRooms } = userData;
    const roomMembers = roomMembersData[roomID];

    if (ownedRooms && ownedRooms[roomID]) {
      res.status(201).json({ status: 201, isOwner: true, isMember: true });
    }
    else if (roomMembers && roomMembers[userID]) {
      res.status(201).json({ status: 201, isOwner: false, isMember: true });
    }
    else {
      res.status(401).json({ status: 401, message: 'You do not have access to this room' });
    }
  }
  catch ({ message }) {
    res.status(401).json({ status: 401, message });
  }
}

async function handleUserSearch(req, res) {
  const { search } = req.query || '';

  try {
    const userDataSnapshot = await database.collection(USERS_PATH).get();
    const searchedUsers = getSearchResults(userDataSnapshot, search);
    const limitResults = searchedUsers.slice(0, 10);

    res.status(200).json({ status: 200, searchedUsers: limitResults });
  }
  catch ({ message }) {
    res.status(40).json({ status: 400, message });
  }
}

module.exports = {
  handleLogin,
  handleNewRoom,
  validateRoomMember,
  handleUserSearch,
};

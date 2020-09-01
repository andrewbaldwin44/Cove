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
  getRegistrationID,
  createRegistrationLink,
  registerInvite,
  isValidInvite,
  getUidFromEmail,
  registerNewRoomMember,
  getMemberData,
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

async function handleNewUser(userID, acceptedData) {
  await writeDatabase(USERS_PATH, userID, acceptedData, database);
}

async function handleLogin(req, res) {
  let { email, displayName, photoURL, userID } = req.body;

  displayName = displayName ? displayName : email;

  let acceptedData = { userID, email, displayName, photoURL };

  try {
    let message = '';

    if (await isReturningUser(userID, database)) {
      message = `Welcome back ${displayName}!`;
    }
    else {
      await handleNewUser(userID, acceptedData);

      message = `Welcome ${displayName}!`;
    }

    res.status(201).json({ status: 201, userData: acceptedData, message });
  }
  catch ({ message }) {
    res.status(401).json({ status: 401, message });
  }
}

async function handleNewRoom(req, res)  {
  const { roomName, roomBackground, userID, selectedMembers } = req.body;

  try {
    const memberIDs = await getMemberIDs(selectedMembers, admin);

    const roomData = await createNewRoom(
      roomName,
      roomBackground,
      userID,
      memberIDs,
      database,
      FieldValue
    );

    res.status(201).json({ status: 201, ...roomData });
  }
  catch ({ message }) {
    res.status(401).json({ status: 401, message });
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

async function handleRoomDetails(req, res) {
  try {
    const { userRooms } = req.body;

    const roomDetails = await getRoomDetails(userRooms, database);

    res.status(201).json({ status: 201, roomDetails });
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

async function handleInviteCreation(req, res) {
  const { roomID, type } = req.body;

  const registrationID = getRegistrationID();
  const registrationLink = createRegistrationLink(roomID, registrationID);
  await registerInvite(roomID, registrationID, type, database);

  res.status(201).json({ status: 201, registrationLink });
}

async function handleInviteValidation(req, res) {
  const { email, roomID, inviteID } = req.body;

  try {
    if (isValidInvite(roomID, inviteID, database, FieldValue)) {
      const userID = await getUidFromEmail(email, admin);
      await registerNewRoomMember(userID, roomID, database);

      res.status(201).json({ status: 201 });
    }
    else {
      throw new Error('Invalid invite');
    }
  }
  catch (error) {
    res.status(401).json({ status: 401, message: 'Invalid invite' });
  }
}

async function handleRoomMembers(req, res) {
  const { roomID } = req.params;

  try {
    const membersResponse = await queryDatabase(ROOMS_PATH, ROOMS_MEMBERS_PATH, database);
    const allMembersData = membersResponse.data();
    const roomMemberIDs = allMembersData[roomID];

    const roomMembers = await getMemberData(roomMemberIDs, database);

    res.status(200).json({ status: 200, roomMembers });
  }
  catch (error) {
    res.status(404).json({ status: 404, message: 'No room members found!' });
  }
}

module.exports = {
  handleLogin,
  handleNewRoom,
  validateRoomMember,
  handleRoomDetails,
  handleRoomMembers,
  handleUserSearch,
  handleInviteCreation,
  handleInviteValidation,
};

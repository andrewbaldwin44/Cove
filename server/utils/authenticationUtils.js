const {
  DATABASE_PATHS: {
    USERS_PATH,
    OWNED_ROOMS_PATH,
    PARTICIPATING_ROOMS_PATH,
    ROOMS_PATH,
    ROOM_NUMBER_PATH,
    ROOMS_MEMBERS_PATH,
    ROOMS_DETAILS_PATH,
    ROOM_STATE_PATH,
    ROOM_INVITES_PATH,
    ACTION_BAR_STATE_PATH,
  },
} = require('../constants');

const { APPS, DEFAULT_BOTTOM_ACTION_BAR_LENGTH } = require('../constants');

const {
  toArray,
} = require('../utils/index');

const { v4: uuidv4 } = require('uuid');

function queryDatabase(path, doc, database) {
  const reference = database.collection(path).doc(doc);
  return reference.get();
}

function writeDatabase(path, doc, newData, database) {
  const reference = database.collection(path).doc(doc);
  return reference.set(newData);
}

function updateDatabase(path, doc, newData, database) {
  const reference = database.collection(path).doc(doc);
  return reference.update(newData);
}

function destroyDatabase(path, doc, database) {

}

async function getUidFromEmail(email, admin) {
  const response = await admin.auth().getUserByEmail(email);
  const { uid } = response;

  return uid;
}

async function isReturningUser(userID, database) {
  const userReference = await queryDatabase(USERS_PATH, userID, database);

  return userReference.exists;
}

async function getMemberIDs(members, admin) {
  const convertMemberEmails = members.map(async memberEmail => {
    return await getUidFromEmail(memberEmail, admin);
  });

  const memberIDs = await Promise.all(convertMemberEmails);

  return memberIDs;
}

function getRoomPath(path, id) {
  return `${path}.${id}`
}

function createRoomMembersData(memberIDs, roomID) {
  return memberIDs.reduce((roomMembers, memberID) => {
    roomMembers[getRoomPath(roomID, memberID)] = true;

    return roomMembers;
  }, {});
}

function createRoomDetailsData(roomID, roomBackground, roomName, FieldValue) {
  return {
    [roomID]: {
      name: roomName,
      dateCreated: FieldValue.serverTimestamp(),
      background: roomBackground,
    }
  };
}

async function updateParticipantsData(memberIDs, roomID, database) {
  console.log('hi')
  const participantsUpdate = memberIDs.map(async memberID => {
    const newParticipatingRooms = { [getRoomPath(PARTICIPATING_ROOMS_PATH, roomID)]: true };

    return await updateDatabase(USERS_PATH, memberID, newParticipatingRooms, database);
  });

  return Promise.all(participantsUpdate);
}

async function setDefaultRoomState(roomID, database) {
  const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                            .collection(roomID).doc(ACTION_BAR_STATE_PATH);

  const defaultSettings = {
    bottom: {
      apps: APPS,
      length: DEFAULT_BOTTOM_ACTION_BAR_LENGTH,
    }
  }

  reference.set(defaultSettings);
}

async function updateRoomMembers(userID, roomID, database) {
  const newMemberPath = `${roomID}.${userID}`;
  const newMemberData = { [newMemberPath]: true };

  updateDatabase(ROOMS_PATH, ROOMS_MEMBERS_PATH, newMemberData, database);
}

async function createNewRoom(roomName, roomBackground, userID, memberIDs, database, FieldValue) {
  const roomID = uuidv4();

  const newRoomMemberIDs = [...memberIDs, userID];
  const newRoomMembers = createRoomMembersData(newRoomMemberIDs, roomID);
  const newRoomDetails = createRoomDetailsData(roomID, roomBackground, roomName, FieldValue);
  const newOwnedRooms = { [getRoomPath(OWNED_ROOMS_PATH, roomID)]: true };

  await updateDatabase(ROOMS_PATH, ROOMS_MEMBERS_PATH, newRoomMembers, database);
  await updateDatabase(ROOMS_PATH, ROOMS_DETAILS_PATH, newRoomDetails, database);
  await updateDatabase(USERS_PATH, userID, newOwnedRooms, database);
  await updateParticipantsData(memberIDs, roomID, database);
  await setDefaultRoomState(roomID, database);

  return {
    name: roomName,
    owner: userID,
    roomID,
  };
}

async function getUserID(idToken, admin) {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken.user_id || null;
}

async function getUserData(userID, database) {
  const response = await queryDatabase(USERS_PATH, userID, database);
  return response.data();
}

async function getRoomMembersData(database) {
  const response = await queryDatabase(ROOMS_PATH, ROOMS_MEMBERS_PATH, database);
  return response.data();
}

async function getRoomDetails(roomIDs, database) {
  const response = await queryDatabase(ROOMS_PATH, ROOMS_DETAILS_PATH, database);
  const allRooms = toArray(response.data());

  return allRooms.reduce((roomDetails, [id, data]) => {
    if (roomIDs.includes(id)) roomDetails[id] = data;
    return roomDetails;
  }, {});
}

function getRegistrationID() {
  return uuidv4();
}

function createRegistrationLink(roomID, linkID) {
  return `/users/log_in?redirect=${roomID}&id=${linkID}`;
}

function registerInvite(roomID, registrationID, type, database) {
  const invitePath = `${roomID}.${type}.${registrationID}`;

  const newInviteData = {
    [invitePath]: true
  }

  updateDatabase(ROOMS_PATH, ROOM_INVITES_PATH, newInviteData, database)
}

async function isValidInvite(roomID, id, database) {
  const allInviteData = await queryDatabase(ROOMS_PATH, ROOM_INVITES_PATH, database);

  const roomInvites = allInviteData.data()[roomID];
  console.log(roomInvites);

  if (roomInvites.public[id]) {
    return true;
  }
  else if (roomInvies.private[id]) {
    //destroy
    return true;
  }
  else {
    return false;
  }
}

async function registerNewRoomMember(userID, roomID, database) {
  await updateParticipantsData([userID], roomID, database);
  return updateRoomMembers(userID, roomID, database);
}

module.exports = {
  queryDatabase,
  writeDatabase,
  updateDatabase,
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
  registerNewRoomMember,
  getUidFromEmail
}

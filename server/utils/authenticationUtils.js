const {
  DATABASE_PATHS: {
    USERS_PATH,
    OWNED_ROOMS_PATH,
    PARTICPATING_ROOMS_PATH,
    ROOMS_PATH,
    ROOM_NUMBER_PATH,
    ROOMS_MEMBERS_PATH,
    ROOMS_DETAILS_PATH,
  },
} = require('../constants');

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

function createRoomDetailsData(roomID, roomName, FieldValue) {
  return {
    [roomID]: {
      name: roomName,
      dateCreated: FieldValue.serverTimestamp()
    }
  };
}

async function updateParticipantsData(memberIDs, roomID, database) {
  const participantsUpdate = memberIDs.map(async memberID => {
    const newParticipatingRooms = { [getRoomPath(PARTICPATING_ROOMS_PATH, roomID)]: true };

    return await updateDatabase(USERS_PATH, memberID, newParticipatingRooms, database);
  });

  return Promise.all(participantsUpdate);
}

async function createNewRoom(roomName, userID, memberIDs, database, FieldValue) {
  const roomID = uuidv4();

  const newRoomMemberIDs = [...memberIDs, userID];
  const newRoomMembers = createRoomMembersData(newRoomMemberIDs, roomID);
  const newRoomDetails = createRoomDetailsData(roomID, roomName, FieldValue);
  const newOwnedRooms = { [getRoomPath(OWNED_ROOMS_PATH, roomID)]: true };


  await updateDatabase(ROOMS_PATH, ROOMS_MEMBERS_PATH, newRoomMembers, database);
  await updateDatabase(ROOMS_PATH, ROOMS_DETAILS_PATH, newRoomDetails, database);
  await updateDatabase(USERS_PATH, userID, newOwnedRooms, database);
  await updateParticipantsData(memberIDs, roomID, database);

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

async function getRoomDetails(ownedRoomIDs, database) {
  const response = await queryDatabase(ROOMS_PATH, ROOMS_DETAILS_PATH, database);
  const allRooms = Object.entries(response.data());

  const ownedRoomDetails = allRooms.reduce((roomDetails, [id, data]) => {
    if (ownedRoomIDs.includes(id)) roomDetails.push(data);
    return roomDetails;
  }, []);

  return ownedRoomDetails;
}

module.exports = {
  queryDatabase,
  writeDatabase,
  isReturningUser,
  getMemberIDs,
  createNewRoom,
  getUserID,
  getUserData,
  getRoomMembersData,
  getRoomDetails,
}

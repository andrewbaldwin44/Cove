const {
  DATABASE_PATHS: {
    USERS_PATH,
    OWNED_ROOMS_PATH,
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

async function isReturningUser(userID, database) {
  const userReference = await queryDatabase(USERS_PATH, userID, database);

  return userReference.exists;
}

function addRoomMembersData(data, database) {
  const reference = database.collection(ROOMS_PATH).doc(ROOMS_MEMBERS_PATH)
                            .collection(ROOMS_MEMBERS_PATH);

  return reference.add(data);
}

function addRoomDetailsData(data, id, database) {
  const reference = database.collection(ROOMS_PATH).doc(ROOMS_DETAILS_PATH)
                            .collection(ROOMS_DETAILS_PATH).doc(id);

  return reference.set(data);
}

async function createNewRoom(roomName, userID, database, FieldValue) {
  const roomID = uuidv4();

  const newRoomMembersPath = `${roomID}.${userID}`;
  const newOwnedRoomsPath = `${OWNED_ROOMS_PATH}.${roomID}`;

  const newRoomMembers = { [newRoomMembersPath]: true };
  const newRoomDetails = {
    [roomID]: {
      name: roomName,
      dateCreated: FieldValue.serverTimestamp()
    }
  };

  const newOwnedRooms = { [newOwnedRoomsPath]: true };

  await updateDatabase(ROOMS_PATH, ROOMS_MEMBERS_PATH, newRoomMembers, database);
  await updateDatabase(ROOMS_PATH, ROOMS_DETAILS_PATH, newRoomDetails, database);
  await updateDatabase(USERS_PATH, userID, newOwnedRooms, database);

  return {
    name: roomName,
    owner: userID,
    roomID,
  };
}

module.exports = {
  queryDatabase,
  writeDatabase,
  isReturningUser,
  createNewRoom,
}

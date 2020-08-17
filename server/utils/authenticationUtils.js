const {
  DATABASE_PATHS: {
    USERS_PATH,
    ROOMS_PATH,
    ROOM_NUMBER_PATH,
    ROOMS_MEMBERS_PATH,
    ROOMS_DETAILS_PATH,
  },
} = require('../constants');

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
  const newRoomMembers = { [userID]: true };
  const roomMembersData = await addRoomMembersData(newRoomMembers, database);

  const roomID = roomMembersData.id;

  const newRoomDetails = {
    name: roomName,
    dateCreated: FieldValue.serverTimestamp(),
  };
  const roomDetailsData = await addRoomDetailsData(newRoomDetails, roomID, database);

  return {
    name: roomName,
    owner: userID,
    roomID,
  };
}

module.exports = {
  writeDatabase,
  isReturningUser,
  createNewRoom,
}

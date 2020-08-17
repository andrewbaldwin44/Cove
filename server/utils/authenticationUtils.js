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

async function createNewRoom(roomName, userID, database, FieldValue) {
  const roomMembersReference = database.collection(ROOMS_PATH).doc(ROOMS_MEMBERS_PATH)
                                       .collection(ROOMS_MEMBERS_PATH);

  const roomMembersData = await roomMembersReference.add({ [userID]: true });

  const roomID = roomMembersData.id;

  const roomDetailsReference = database.collection(ROOMS_PATH).doc(ROOMS_DETAILS_PATH)
                                       .collection(ROOMS_DETAILS_PATH).doc(roomID);

  const roomDetailsData = await roomDetailsReference.set({
    name: roomName,
    dateCreated: FieldValue.serverTimestamp(),
  });

  return {
    name: roomName,
    owner: userID,
  };
}

module.exports = {
  writeDatabase,
  isReturningUser,
  createNewRoom,
}

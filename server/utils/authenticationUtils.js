const {
  DATABASE_PATHS: {
    APP_USERS_PATH,
    ROOM_NUMBER_PATH,
  },
} = require('../constants');
const handleError = ({ message }) => {throw new Error(message)};

// The once() method retrieves a one time 'snapshot' of the data at a specified path
function queryDatabase(path, database, successCallback, failureCallback = handleError) {
  return database.ref(path).once(
    'value',
    successCallback,
    handleError
  );
}

async function isReturningUser(userID, database) {
  let userExists;
  const userDataPath = `${APP_USERS_PATH}/${userID}`;

  const verifyDataExistence = snapshot => {userExists = snapshot.exists()};

  await queryDatabase(userDataPath, database, verifyDataExistence);

  return userExists;
}

async function updateRoomNumber(database, roomNumber) {
  return database.ref().update({ [ROOM_NUMBER_PATH]: roomNumber + 1 });
}

async function getRoomNumber(database) {
  let roomNumber;
  const fetchedRoomNumber = snapshot => {roomNumber = snapshot.val()};

  await queryDatabase(ROOM_NUMBER_PATH, database, fetchedRoomNumber);
  await updateRoomNumber(database, roomNumber);

  return roomNumber;
}

module.exports = {
  isReturningUser,
  getRoomNumber,
}

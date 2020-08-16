const {
  DATABASE_PATHS: {
    appUsers,
    roomNumber,
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
  const userDataPath = `appUsers/${userID}`;

  const verifyDataExistence = snapshot => {userExists = snapshot.exists()};

  await queryDatabase(userDataPath, database, verifyDataExistence);

  return userExists;
}

async function updateRoomNumber(database, newRoomNumber) {
  return database.ref().update({ [roomNumber]: newRoomNumber + 1 });
}

async function getRoomNumber(database) {
  let newRoomNumber;
  const fetchedRoomNumber = snapshot => {newRoomNumber = snapshot.val()};
  console.log(roomNumber)

  await queryDatabase(roomNumber, database, fetchedRoomNumber);
  await updateRoomNumber(database, newRoomNumber);

  return newRoomNumber;
}

module.exports = {
  isReturningUser,
  getRoomNumber,
}

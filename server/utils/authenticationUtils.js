const {
  DATABASE_PATHS: {
    appUsers,
  },
} = require('../constants');

// The once() method retrieves a one time 'snapshot' of the data at a specified path
function queryDatabase(path, database, successCallback, failureCallback) {
  return database.ref(path).once(
    'value',
    successCallback,
    failureCallback
  );
}

async function isReturningUser(userID, database) {
  let userExists;
  const userDataPath = `appUsers/${userID}`;
  
  const verifyDataExistence = snapshot => {userExists = snapshot.exists()};
  const handleError = ({ message }) => {throw new Error(message)};

  await queryDatabase(userDataPath, database, verifyDataExistence, handleError);

  return userExists;
}

module.exports = {
  isReturningUser,
}

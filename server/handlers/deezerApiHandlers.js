const DZ = require('node-deezer');
const deezer = new DZ();

const appID = process.env.DEEZER_API_KEY;
const appSecret = process.env.DEEZER_API_SECRET;

const admin = require('firebase-admin');
const database = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

const {
  updateDatabase,
  destroyDatabase,
} = require('../utils/authenticationUtils');

const {
  DATABASE_PATHS: {
    USERS_PATH,
  },
} = require('../constants');

function handleDeezerLogout(userID) {
  destroyDatabase(USERS_PATH, userID, 'deezerID', database, FieldValue);
}

function handleDeezerLogin(req, res) {
  try {
    const redirectUrl = 'http://localhost:3000/api/deezer_authenticated';
    const loginUrl = deezer.getLoginUrl(appID, redirectUrl);

    res.status(200).json({ status: 200, loginUrl });
  }
  catch {
    res.status(400).json({ status: 400, message: 'Could not get login URL' });
  }
}

function handleDeezerRegistration(req, res) {
  const { userID, deezerID } = req.body;

  try {
    deezer.createSession(appID, appSecret, deezerID, async (error, response) => {
      if (response) {
        const { accessToken } = response;

        const newUserData = { deezerID: accessToken };

        await updateDatabase(USERS_PATH, userID, newUserData, database);

        res.status(200).json({ status: 200, deezerID: accessToken });
      }
      else {
        res.status(400).json({ status: 400, message: 'Could not create session' })
      }
    });
  }
  catch ({ message }) {
    res.status(400).json({ status: 400, message });
  }
}

async function handleDeezerSearch(req, res) {
  const { search, deezerID, userID } = req.body;

  try {
    const searchRequest = {
      resource: 'search/track',
      method: 'get',
      fields: { q: search }
    }

    deezer.request(deezerID, searchRequest, (error, results) => {
      if (results) {
        const { data } = results;

        res.status(200).json({ status: 200, searchResults: data });
      }
      else {
        handleDeezerLogout(userID);
      }
    });
  }
  catch (error) {
    handleDeezerLogout(userID);
  }
}

async function handleDeezerChart(req, res) {
  const deezerResponse = await fetch('https://api.deezer.com/chart');
  const deezerChart = await deezerResponse.json();

  res.status(200).json({ status: 200, deezerChart });
}

module.exports = {
  handleDeezerLogin,
  handleDeezerRegistration,
  handleDeezerSearch,
  handleDeezerChart,
};

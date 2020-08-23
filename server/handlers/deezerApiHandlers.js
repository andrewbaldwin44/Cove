const DZ = require('node-deezer');
const deezer = new DZ();

const appID = process.env.DEEZER_API_KEY;
const appSecret = process.env.DEEZER_API_SECRET;

const admin = require('firebase-admin');
const database = admin.firestore();

const {
  updateDatabase,
} = require('../utils/authenticationUtils');

const {
  DATABASE_PATHS: {
    USERS_PATH,
  },
} = require('../constants');

function handleDeezerLogin(req, res) {
  const redirectUrl = 'http://localhost:3000/api/deezer_authenticated';
  const loginUrl = deezer.getLoginUrl(appID, redirectUrl);

  res.status(200).json({ status: 200, loginUrl });
}

function handleDeezerRegistration(req, res) {
  const { userID, deezerID } = req.body;

  deezer.createSession(appID, appSecret, deezerID, async (error, response) => {
    if (response) {
      const { accessToken } = response;

      const newUserData = { deezerID: accessToken };

      await updateDatabase(USERS_PATH, userID, newUserData, database);

      res.status(200).json({ status: 200, deezerID: accessToken });
    }
    else {
      res.status(400).json({ status: 400, message: error });
    }
  });
}

async function handleDeezerSearch(req, res) {
  const { search, code } = req.query;
  //deezer.get("artist",{method:"top",id: "27"})
  try {
    const searchRequest = {
      resource: 'search/track',
      method: 'get',
      fields: { q: search }
    }

    deezer.request(code, searchRequest, (error, results) => {
      if (results) {
        const { data } = results;

        res.status(200).json({ status: 200, searchResults: data });
      }
      else {
        throw new Error(error);
      }
    });
  }
  catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
}

module.exports = {
  handleDeezerLogin,
  handleDeezerRegistration,
  handleDeezerSearch,
};

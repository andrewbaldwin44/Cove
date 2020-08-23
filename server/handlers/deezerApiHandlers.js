const DZ = require('node-deezer');
const deezer = new DZ();

const appId = process.env.DEEZER_API_KEY;
const appSecret = process.env.DEEZER_API_SECRET;

let deezerID = {};

function handleDeezerLogin(req, res) {
  const redirectUrl = 'http://localhost:3000/api/deezer_authenticated';
  const loginUrl = deezer.getLoginUrl(appId, redirectUrl);

  res.status(200).json({ status: 200, loginUrl });
}

async function handleDeezerAuthenticated(req, res) {
  // `code` should have been handed back by Deezer as a parameter
  // if it was not, an error occurred, and we must handle it here
  const { code } = req.query;

  try {
    if (code) {
      deezerID = code;

      res.status(200).send('');
    }
    else {
      throw new Error('Deezer authentication was unsuccesful');
    }
  }
  catch ({ message }) {
    res.status(404).send(message);
  }
    // Since we have this code, we can trust that the user
    // actually meant to grant us access to their account.

    // Now we need to combine this code with our app credentials
    // to prove to Deezer that we're a valid app-- if everything works,
    // we'll get an `access_token` we can use to represent the user
    // for a period of time (or "forever" if we have the offline_access permission)
    // deezer.createSession(appId, appSecret, code, function (err, result) {
    //   console.log(result);
    //
    //   // Now we can do API requests!
    //
    //   // e.g. search for artists with names containing the phrase 'empire'
    //   deezer.request(result.accessToken,
    //   {
    //     resource: 'search/artist',
    //     method: 'get',
    //     fields: { q: 'empire' }
    //   },
    //   function done (err, results) {
    //     if (err) throw err;
    //     console.log(results);
    //   });
    //
    // });
}

module.exports = {
  handleDeezerLogin,
};

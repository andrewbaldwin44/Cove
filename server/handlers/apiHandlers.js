const fetch = require('isomorphic-fetch')

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_SEARCH_BASE_URL = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}`
const YOUTUBE_RESULTS = 48;

async function handleYoutubeSearch(req, res) {
  const { search } = req.query;

  const searchResponse = await fetch(`${YOUTUBE_SEARCH_BASE_URL}&part=snippet&q=${search}&order=date&maxResults=${YOUTUBE_RESULTS}`);
  const { items } = await searchResponse.json();

  const searchResults = items.reduce((searchResults, item) => {
    const { id, snippet } = item;

    searchResults.push({ id, snippet });
    return searchResults;
  }, []);

  res.status(200).json({ status: 200, searchResults });
}

module.exports = {
  handleYoutubeSearch
}

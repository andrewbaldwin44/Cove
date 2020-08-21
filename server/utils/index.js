function matches(item, search) {
    const normalizedItem = item.toLowerCase();
    const normalizedSearch = search.toLowerCase() || '';

    return normalizedItem.includes(normalizedSearch);

}

function getSearchResults(dataToSearch, search) {
  const searchResults = [];

  dataToSearch.forEach(doc => {
    const userData = doc.data();
    const { displayName, email } = userData;

    if (matches(displayName, search) || matches(email, search)) {
      searchResults.push(userData);
    }
  });

  return searchResults;
}

module.exports = { getSearchResults };

import React, { createRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { BsSearch } from 'react-icons/bs';

import AppHeader from  '../AppHeader';
import SearchedSongs from './SearchedSongs';

function Home({ deezerID }) {
  const searchInput = createRef();
  const [searchResults, setSearchResults] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  console.log(currentlyPlaying);

  const requestDeezerResults = searchValue => {
    fetch(`/api/deezer_search?search=${searchValue}&code=${deezerID}`)
      .then(response => response.json())
      .then(({ searchResults }) => setSearchResults(searchResults))
  }

  const getSearchResults = event => {
    event.preventDefault();

    const searchValue = searchInput.current.value;

    if (searchValue.length > 0) {
      requestDeezerResults(searchValue)
    }
  }

  // homepage
  // eslint-disable-next-line
  useEffect(() => requestDeezerResults('chart'), []);

  return(
    <Wrapper>
      <AppHeader>
        <form onSubmit={getSearchResults}>
          <DeezerSearch
            type='text'
            ref={searchInput}
            placeholder='Search'
          />
          <SearchButton
            type='submit'
          >
              <BsSearch />
          </SearchButton>
        </form>
      </AppHeader>
      <SearchedSongs
        searchResults={searchResults}
        setCurrentlyPlaying={setCurrentlyPlaying}
      />
      <Footer>
        <Player
          scrolling='no'
          frameBorder='0'
          allowtransparency='true'
          src={`https://www.deezer.com/plugins/player?format=classic&playlist=true&autoplay=true \
                &color=007FEB&layout=dark&size=medium&type=tracks&id=${currentlyPlaying}& \
                app_id=431662`}
        />
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% + 2px);
`;

const DeezerSearch = styled.input`
  height: 40px;
  width: 400px;
  padding-right: 2px;
  font-size: 1em;
`;

const SearchButton = styled.button`
  width: 70px;
  height: 40px;
  background-color:#4B515D;

  svg {
    color: white;
  }
`;

const Player = styled.iframe`
  width: 100vw;
  height: 90px;
`;

const Footer = styled.div`

`;

export default Home;

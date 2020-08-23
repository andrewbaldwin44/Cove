import React, { createRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { BsSearch } from 'react-icons/bs';

import SearchedSongs from './SearchedSongs';

function Home({ deezerID }) {
  const searchInput = createRef();
  const [searchResults, setSearchResults] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  console.log(currentlyPlaying);

  const requestDeezerResults = searchValue => {
    fetch(`/api/deezer_search?search=${searchValue}&code=${deezerID}`)
      .then(response => response.json())
      .then(({ searchResults }) => {
        console.log(searchResults)
        setSearchResults(searchResults)
      })
  }

  const getSearchResults = event => {
    event.preventDefault();

    const searchValue = searchInput.current.value;

    if (searchValue.length > 0) {
      requestDeezerResults(searchValue)
    }
  }

  // homepage
  useEffect(() => requestDeezerResults('chart'), []);

  return(
    <Wrapper>
      <Header>
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
      </Header>
      <SearchedSongs
        searchResults={searchResults}
        setCurrentlyPlaying={setCurrentlyPlaying}
      />
      <Footer>
        <iframe
          scrolling='no'
          frameBorder='0'
          allowtransparency='true'
          src={`https://www.deezer.com/plugins/player?format=classic&playlist=true \
                &color=007FEB&layout=dark&size=medium&type=tracks&id=${currentlyPlaying}& \
                app_id=431662`}
          width='700'
          height='90'
        />
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - 50px);
`;

const Header = styled.div`
  position: absolute;
  top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 70px;
  background-color: var(--main-black);
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

const Footer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  max-height: 0px;
`;

export default Home;

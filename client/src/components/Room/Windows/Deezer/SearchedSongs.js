import React from 'react';
import styled from 'styled-components';

function SearchedSongs({ searchResults, setCurrentlyPlaying }) {
  return (
    <Body>
      {searchResults && searchResults.map(result => {
        const {
          id,
          title: songTitle,
          artist: {
            name: artist,
            picture
          }
        } = result;

        return (
          <SearchResult
            key={id}
            onClick={() => setCurrentlyPlaying(id)}
          >
            <img src={picture} />
            <span>{songTitle}</span>
            <span>{artist}</span>
          </SearchResult>
        )
      })}
    </Body>
  )
}

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 40px 50px;
  height: 100%;
  overflow-y: scroll;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 200px;
  margin-bottom: 200px;
  margin-right: 50px;
  cursor: pointer;
`;

export default SearchedSongs;

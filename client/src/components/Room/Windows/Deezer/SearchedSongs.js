import React from 'react';
import styled from 'styled-components';

function SearchedSongs({ searchResults, setCurrentlyPlaying }) {
  return (
    <Body>
      {searchResults && searchResults.map(result => {
        const { id, title } = result;

        return (
          <SearchResult
            key={id}
            onClick={() => setCurrentlyPlaying(id)}
          >
            <span>{title}</span>
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
  margin-top: 40px;
  height: 100%;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 200px;
  cursor: pointer;
`;

export default SearchedSongs;

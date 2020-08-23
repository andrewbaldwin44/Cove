import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Deezer() {
  const [loginUrl, setLoginUrl] = useState(null);

  useEffect(() => {
    fetch(`/api/deezer_login`)
      .then(response => response.json())
      .then(({ loginUrl }) => setLoginUrl(loginUrl));
  }, []);

  return (
    <Body>
    {loginUrl && (
      <a
        href={loginUrl}
        target='_blank'
        alt='Deezer Login'
        rel='noopener noreferrer'
      >
        Login to Deezer
      </a>
    )}
    </Body>
  )
}

const Body = styled.div`
  margin-top: 70px;
  height: calc(100% - 72px);
`;

export default Deezer;

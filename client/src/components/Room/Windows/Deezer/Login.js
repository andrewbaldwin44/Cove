import React from 'react';


function Login({ loginUrl }) {
  return (
    <a
      href={loginUrl}
      target='_blank'
      alt='Deezer Login'
      rel='noopener noreferrer'
    >
      Login to Deezer
    </a>
  )
}

export default Login;

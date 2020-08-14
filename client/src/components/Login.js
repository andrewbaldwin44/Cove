import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as GoogleIcon } from  '../assets/images/google-icon.svg';
import TextField from '@material-ui/core/TextField';

function Login({ accountCreated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = event => {
    event.preventDefault();
  }

  return (
    <Wrapper>
      <PageLabel>{accountCreated ? 'Log In' : 'Sign Up'}</PageLabel>
      <StyledForm onSubmit={submitForm}>
        <TextField
          type="email"
          label="Email"
          onChange={event => setEmail(event.target.value)}
          variant="outlined"
          required
        />
        <TextField
          type="password"
          label="Password"
          onChange={event => setPassword(event.target.value)}
          variant="outlined"
          required
        />
        <button type="submit">{accountCreated ? 'Sign In' : 'Create an Account'}</button>
      </StyledForm>
      <GoogleButton>
        <StyledGoogleIcon />
        Continue with Google
      </GoogleButton>
      {accountCreated ? (
          <NavigateContainer>
            <span>{'New here? '}</span>
            <StyledLink to='/users/sign_up'>Create an Account</StyledLink>
          </NavigateContainer>
        ) : (
          <NavigateContainer>
            <span>Already Have an Account?</span>
            <StyledLink to='/users/log_in'>Log In</StyledLink>
          </NavigateContainer>
        )
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
  width: 400px;
`;

const PageLabel = styled.h2`
  font-size: 2em;
  font-weight: bold;
  align-self: flex-start;
  padding: 15px 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 1px solid black;
  border-radius: 6px;
  padding: 0 16px;
  margin-bottom: 50px;
  height: 40%;
  width: 100%;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 6px;
  padding: 0 70px;
  margin-bottom: 35px;
  height: 60px;
  width: 100%;
  font-family: 'Inter', sans-serif;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  height: 38px;
  width: 38px;
`;

const NavigateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 6px;
  height: 65px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: #0366d6;
  text-decoration: underline;
  padding-left: 10px;
`;

export default Login;

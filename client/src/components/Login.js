import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as GoogleIcon } from  '../assets/images/google-icon.svg';
import TextField from '@material-ui/core/TextField';

import { AuthenticationContext } from './AuthenticationContext';

import { PASSWORD_REQUIREMENTS } from '../constants';
const { minimumPasswordRequirements, minimumPasswordLength } = PASSWORD_REQUIREMENTS;

function Login({ accountCreated }) {
  const {
    createUserWithEmail,
    signInWithEmail,
    signInWithGoogle,
  } = useContext(AuthenticationContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const createUserErrorMessage = (code) => {
    let newErrorMessage = '';
    switch (code) {
      case 'auth/user-not-found':
        newErrorMessage = 'Email is invalid';
        break;
      case 'auth/wrong-password':
        newErrorMessage = 'Password is incorrect';
        break;
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        return;
      default:
        newErrorMessage = 'Email or Password is invalid';
        break;
    }

    setErrorMessage(newErrorMessage);
  }

  const redirectHome = () => history.push('/');
  const sendErrorCode = ({ code }) => createUserErrorMessage(code);
  const isStrongPassword = () => minimumPasswordRequirements.test(password);

  const userSignup = () => {
    if (isStrongPassword(password)) {
      createUserWithEmail(email, password)
        .then(redirectHome)
        .catch(sendErrorCode);
    }
    else if (password.length < minimumPasswordLength) {
      setErrorMessage('Password is too short (minimum 8 characters)');
    }
    else {
      setErrorMessage('Password should contain at least one upper case character, number or symbol');
    }
  }

  const userLogin = () => {
    signInWithEmail(email, password)
      .then(redirectHome)
      .catch(sendErrorCode);
  }

  const googleLogin = () => {
    signInWithGoogle()
      .then(redirectHome)
      .catch(sendErrorCode);
  }

  const submitForm = event => {
    event.preventDefault();

    if (accountCreated) userLogin();
    else userSignup()
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
        <ErrorMessage errorMessage={errorMessage}>
          <span>{errorMessage}</span>
        </ErrorMessage>
      </StyledForm>

      <GoogleButton
        onClick={googleLogin}
      >
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

const ErrorMessage = styled.div`
  display: ${({ errorMessage }) => errorMessage === '' ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #FFE3E3;
  color: #f13240;
  padding: 20px 10px;
`;

export default Login;

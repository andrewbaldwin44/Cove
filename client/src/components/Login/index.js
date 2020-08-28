import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import TextField from '@material-ui/core/TextField';

import Header from '../Header/index';
import Footer from './Footer';

import { AuthenticationContext } from '../AuthenticationContext';
import { validateInvitation, createLoginLink } from '../../utils/authenticationUtils';

import { PASSWORD_REQUIREMENTS, AUTHENTICATION_ERROR_MESSAGES } from '../../constants';
const { minimumPasswordRequirements, minimumPasswordLength } = PASSWORD_REQUIREMENTS;
const {
  invalidEmail,
  wrongPassword,
  emailInUse,
  passwordTooShort,
  missingPasswordRequirements,
  defaultMessage,
} = AUTHENTICATION_ERROR_MESSAGES;

function Login({ accountCreated }) {
  const {
    createUserWithEmail,
    signInWithEmail,
  } = useContext(AuthenticationContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const redirect = query.get('redirect');
  const inviteID = query.get('id');
  const signUpLink = createLoginLink(redirect, inviteID, 'sign_up');
  const loginLink = createLoginLink(redirect, inviteID, 'log_in');

  const createUserErrorMessage = (code) => {
    let newErrorMessage = '';
    switch (code) {
      case 'auth/user-not-found':
        newErrorMessage = invalidEmail;
        break;
      case 'auth/wrong-password':
        newErrorMessage = wrongPassword;
        break;
      case 'auth/email-already-in-use':
        newErrorMessage = emailInUse;
        break;
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        return;
      default:
        newErrorMessage = defaultMessage;
        break;
    }

    setErrorMessage(newErrorMessage);
  }

  const redirectTo = path => history.push(path);
  const sendErrorCode = ({ code }) => createUserErrorMessage(code);
  const isStrongPassword = () => minimumPasswordRequirements.test(password);

  const handleRedirect = (userEmail = email) => {
    if (redirect && inviteID) {
      validateInvitation(userEmail, inviteID, redirect)
        .then(() => redirectTo(`/cove/${redirect}`))
        .catch(error => redirectTo('/'));
    }
    else if (redirect) {
      redirectTo(`/cove/${redirect}`);
    }
    else {
      redirectTo('/');
    }
  }

  const userSignup = () => {
    if (isStrongPassword(password)) {
      createUserWithEmail(email, password)
        .then(({ user: { email } }) => email)
        .then(handleRedirect)
        .catch(sendErrorCode);
    }
    else if (password.length < minimumPasswordLength) {
      setErrorMessage(passwordTooShort);
    }
    else {
      setErrorMessage(missingPasswordRequirements);
    }
  }

  const userLogin = () => {
    signInWithEmail(email, password)
      .then(({ user: { email } }) => email)
      .then(handleRedirect)
      .catch(sendErrorCode);
  }

  const submitForm = event => {
    event.preventDefault();

    if (accountCreated) userLogin();
    else userSignup()
  }

  return (
    <>
      <Header />
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
          <SubmitButton type="submit">{accountCreated ? 'Log In' : 'Sign Up'}</SubmitButton>
          <ErrorMessage errorMessage={errorMessage}>
            <span>{errorMessage}</span>
          </ErrorMessage>
        </StyledForm>
        <Footer
          accountCreated={accountCreated}
          handleRedirect={handleRedirect}
          sendErrorCode={sendErrorCode}
          signUpLink={signUpLink}
          loginLink={loginLink}
        />
      </Wrapper>
    </>
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
  width: var(--authentication-form-width);
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
  height: 40%;
  width: 100%;
`;

const SubmitButton = styled.button`
  height: 50px;
  width: 100%;
  border: 2px solid white;
  border-radius: 6px;
  transition: all 0.4s ease-in;

  &:hover {
    border-color: var(--light-blue);
  }
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

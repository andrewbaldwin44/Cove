import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as GoogleIcon } from  '../../assets/images/google-icon.svg';

import { AuthenticationContext } from '../AuthenticationContext';

function Footer({ accountCreated, redirectHome, sendErrorCode }) {
  const {
    signInWithGoogle,
  } = useContext(AuthenticationContext);

  const googleLogin = () => {
    signInWithGoogle()
      .then(redirectHome)
      .catch(sendErrorCode);
  }

  return (
    <>
      <Seperator><span>OR</span></Seperator>

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
    </>
  )
}

const Seperator = styled.p`
  margin: 45px 0;
  line-height: 0.5;
  text-align: center;
  color: var(--light-gray);

  span {
    display: inline-block;
    position: relative;

    &:before, :after {
      content: "";
      position: absolute;
      border-bottom: 1px solid var(--light-gray);
      width: calc(var(--authentication-form-width) / 2 - 30px);
      top: 50%;
    }

    :before {
      right: 100%;
      margin-right: 15px;
    }

    :after {
      left: 100%;
      margin-left: 15px;
    }
  }
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

export default Footer;

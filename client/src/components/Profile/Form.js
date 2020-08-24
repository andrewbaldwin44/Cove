import React, { createRef } from 'react';
import styled from 'styled-components';

function Form({ userData }) {
  const { displayName } = userData;

  const imageSelector = event => {
    console.log(event.target.value)
  }

  return (
    <Wrapper>
      <fieldset>
        <label htmlFor='display-name'>Display Name</label>
        <NameInput
          type='text'
          name='display-name'
          id='display-name'
          defaultValue={displayName}
        />
      </fieldset>
      <fieldset>
        <label htmlFor='profile-picture'>Choose a new Profile Picture</label>
        <input
          type='file'
          name='profile-picture'
          id='profile-picture'
          onChange={imageSelector}
        />
      </fieldset>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 1em;
  height: 40%;
  width: 100%;

  label {
    font-size: 1.1em;
    font-weight: bold;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }
`;

const NameInput = styled.input`
  width: 70%;
  height: 45px;
  font-size: 1em;
`;

export default Form;

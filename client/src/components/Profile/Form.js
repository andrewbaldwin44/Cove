import React from 'react';
import styled from 'styled-components';

function Form({ currentName, register }) {
  return (
    <Wrapper>
      <fieldset>
        <label htmlFor='name'>Display Name</label>
        <NameInput
          type='text'
          name='name'
          id='name'
          defaultValue={currentName}
          ref={register}
          required
        />
      </fieldset>
      <StyledFieldSet>
        <label htmlFor='profile'>Choose a new Profile Picture</label>
        <input
          type='file'
          name='profile'
          id='profile'
          ref={register}
        />
    </StyledFieldSet>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

const StyledFieldSet = styled.fieldset`
  &[type="file"], label {
    background: var(--main-red);
    border-radius: 5px;
    color: white;
    font-weight: normal;
    padding: 20px;
    width: 40%;
    cursor: pointer;
  }

  & input {
    display: none;
  }
`;

export default Form;

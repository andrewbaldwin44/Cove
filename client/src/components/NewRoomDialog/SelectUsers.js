import React from 'react';
import styled from 'styled-components';

import UserCheckbox from './UserCheckbox';

function SelectUsers({ users, hasSearched, addMember }) {
  if (users && users.length === 0 && hasSearched) {
    return (
      <Wrapper>
        <span>Your search returned no results!</span>
      </Wrapper>
    )
  }
  else if (users && hasSearched) {
    return (
      <Wrapper>
        <div>
          {users.map((userData, index) => {
            return (
              <UserCheckbox
                key={`users${index}`}
                userData={userData}
                addMember={addMember}
              />
            )
          })}
        </div>
      </Wrapper>
    )
  }
  else {
    return (
      <div>
      </div>
    )
  }
}

const Wrapper = styled.div`
  margin-top: 30px;
`;

export default SelectUsers

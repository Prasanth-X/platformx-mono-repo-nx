import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UserManagementProps {}

const StyledUserManagement = styled.div`
  color: pink;
`;

export function UserManagement(props: UserManagementProps) {
  return (
    <StyledUserManagement>
      <h1>Welcome to UserManagement!</h1>
    </StyledUserManagement>
  );
}

export default UserManagement;

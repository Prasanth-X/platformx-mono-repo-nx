import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UtilitiesProps {}

const StyledUtilities = styled.div`
  color: pink;
`;

export function Utilities(props: UtilitiesProps) {
  return (
    <StyledUtilities>
      <h1>Welcome to Utilities!</h1>
    </StyledUtilities>
  );
}

export default Utilities;

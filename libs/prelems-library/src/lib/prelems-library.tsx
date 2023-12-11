import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PrelemsLibraryProps {}

const StyledPrelemsLibrary = styled.div`
  color: pink;
`;

export function PrelemsLibrary(props: PrelemsLibraryProps) {
  return (
    <StyledPrelemsLibrary>
      <h1>Welcome to PrelemsLibrary!</h1>
    </StyledPrelemsLibrary>
  );
}

export default PrelemsLibrary;

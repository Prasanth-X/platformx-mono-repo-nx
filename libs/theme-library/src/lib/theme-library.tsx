import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ThemeLibraryProps {}

const StyledThemeLibrary = styled.div`
  color: pink;
`;

export function ThemeLibrary(props: ThemeLibraryProps) {
  return (
    <StyledThemeLibrary>
      <h1>Welcome to ThemeLibrary!</h1>
    </StyledThemeLibrary>
  );
}

export default ThemeLibrary;

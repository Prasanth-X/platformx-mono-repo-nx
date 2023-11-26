import styled from 'styled-components';

/* eslint-disable-next-line */
export interface XComponentsProps {}

const StyledXComponents = styled.div`
  color: pink;
`;

export function XComponents(props: XComponentsProps) {
  return (
    <StyledXComponents>
      <h1>Welcome to XComponents!</h1>
    </StyledXComponents>
  );
}

export default XComponents;

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface XCommonComponentsProps {}

const StyledXCommonComponents = styled.div`
  color: pink;
`;

export function XCommonComponents(props: XCommonComponentsProps) {
  return (
    <StyledXCommonComponents>
      <h1>Welcome to XCommonComponents!</h1>
    </StyledXCommonComponents>
  );
}

export default XCommonComponents;

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface XSharedComponentsProps {}

const StyledXSharedComponents = styled.div`
  color: pink;
`;

export function XSharedComponents(props: XSharedComponentsProps) {
  return (
    <StyledXSharedComponents>
      <h1>Welcome to XSharedComponents!</h1>
    </StyledXSharedComponents>
  );
}

export default XSharedComponents;

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface XImageRenderProps {}

const StyledXImageRender = styled.div`
  color: pink;
`;

export function XImageRender(props: XImageRenderProps) {
  return (
    <StyledXImageRender>
      <h1>Welcome to XImageRender!</h1>
    </StyledXImageRender>
  );
}

export default XImageRender;

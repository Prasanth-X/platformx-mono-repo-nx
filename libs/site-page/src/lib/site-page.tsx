import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SitePageProps {}

const StyledSitePage = styled.div`
  color: pink;
`;

export function SitePage(props: SitePageProps) {
  return (
    <StyledSitePage>
      <h1>Welcome to SitePage!</h1>
    </StyledSitePage>
  );
}

export default SitePage;

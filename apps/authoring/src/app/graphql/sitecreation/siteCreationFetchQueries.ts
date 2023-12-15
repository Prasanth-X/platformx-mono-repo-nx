import { gql } from '@apollo/client';

export const FETCH_SITE_LISTING = gql`
  query FETCH_SITE_LISTING($page: String!) {
    authoring_getSitedetails(siteConfig: SiteInfo, page: $page)
  }
`;

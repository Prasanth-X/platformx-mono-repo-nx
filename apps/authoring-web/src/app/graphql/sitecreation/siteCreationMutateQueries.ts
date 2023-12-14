import { gql } from '@apollo/client';

export const CREATE_NEW_SITE_CONFIG = gql`
  mutation createSiteConfig($input: authoring_MultiSiteRequest) {
    authoring_createSiteConfig(siteConfig: SiteInfo, input: $input) {
      name
      message
      path
    }
  }
`;

export const UPDATE_SITE_CONFIG = gql`
  mutation updateSiteConfig($input: authoring_MultiSiteRequest) {
    authoring_updateSiteConfig(siteConfig: SiteInfo, input: $input) {
      id
      message
      path
    }
  }
`;

export const PUBLISH_MULTISITE_INFO = gql`
  mutation publishMultiSiteInfo($input: authoring_PublishInfo) {
    authoring_publishMultiSiteInfo(configType: SiteInfo, input: $input) {
      parent_page_url
      current_page_url
      message
    }
  }
`;

export const SITE_TITLE_VALIDATION = gql`
  mutation searchExistsValidation($search: String! ) {
    authoring_searchExistsValidation(siteConfig: "SiteInfo",search: $search) {
      isExist
      message
    }
  }
`;

export const SUBDOMAIN_VALIDATION = gql`
  mutation searchExistsValidation($search: String! $zoneName: String!) {
    authoring_searchExistsValidation(siteConfig: "Domain", search: $search, zoneName: $zoneName) {
      isExist
      message
    }
  }
`;
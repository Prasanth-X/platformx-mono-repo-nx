import { gql } from '@apollo/client';

export const UPDATE_FOOTER_SETTING = gql`
  mutation ($input: authoring_MultiSiteRequest) {
    authoring_createOrUpdateSiteSettings(
      siteConfig: SiteFooter
      input: $input
    ) {
      name
      message
      path
    }
  }
`;

export const UPDATE_MEDIA_HANDLE = gql`
  mutation ($input: authoring_MultiSiteRequest) {
    authoring_createOrUpdateSiteSettings(
      siteConfig: SiteMediaHandle 
      input: $input
    ) {
      name
      message
      path
    }
  }
`;

export const UPDATE_COOKIE_POLICY = gql`
  mutation ($input: authoring_MultiSiteRequest) {
    authoring_createOrUpdateSiteSettings(
      siteConfig: SiteCookiePolicy
      input: $input
    ) {
      name
      message
      path
    }
  }
`;

export const UPDATE_HEADER_SETTING = gql`
  mutation updateSiteConfig($input: authoring_MultiSiteRequest) {
    authoring_createOrUpdateSiteSettings(
      siteConfig: SiteHeaderSettings
      input: $input
    ) {
      id
      message
      path
    }
  }
`;

export const UPDATE_GLOBAL_SETTING = gql`
  mutation createOrUpdateSiteSettings ($input: authoring_MultiSiteRequest){
    authoring_createOrUpdateSiteSettings(
    siteConfig: SiteBranding,
    input: $input
  ) {
    path
    message
    name
  }
}
`;

export const PUBLISH_HEADER_SETTING = gql`
  mutation publishMultiSiteInfo($input: authoring_PublishInfo) {
    authoring_publishMultiSiteInfo(
      configType: SiteHeaderSettings
      input: $input
    ) {
      parent_page_url
      current_page_url
      message
    }
  }
`;

export const PUBLISH_GLOBAL_SETTING = gql`
mutation publishMultiSiteInfo($input: authoring_PublishInfo){
  authoring_publishMultiSiteInfo(
    configType:SiteBranding
    input: $input 
   ) {   
      parent_page_url
      current_page_url
      message
  }
}
`;

export const PUBLISH_COOKIE_SETTING = gql`
mutation publishMultiSiteInfo($input: authoring_PublishInfo){
  authoring_publishMultiSiteInfo(configType:SiteCookiePolicy,input: $input) {   
      parent_page_url
      current_page_url
      message
  }
}
`;

export const PUBLISH_FOOTER_SETTING = gql`
mutation publishMultiSiteInfo($input: authoring_PublishInfo){
  authoring_publishMultiSiteInfo(configType:SiteFooter,input: $input) {   
      parent_page_url
      current_page_url
      message
  }
}
`;

export const PUBLISH_MEDIA_HANDLE = gql`
mutation publishMultiSiteInfo($input: authoring_PublishInfo){
  authoring_publishMultiSiteInfo(configType:SiteMediaHandle,input: $input) {   
      parent_page_url
      current_page_url
      message
  }
}
`;
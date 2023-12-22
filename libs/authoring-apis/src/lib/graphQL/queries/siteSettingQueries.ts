import { gql } from '@apollo/client';
export const FETCH_FOOTER_SETTING = gql`
  query FETCH_FOOTER_SETTING($pagePath: String!) {
    authoring_getFooterSettings(pagePath: $pagePath) {
      about_us_text
      address
      contact_number
      copyright_text
      email_address
      news_letter_description
      news_letter_title
      site_logo
      title_text
      lastmodifiedby
      lastmodificationdate
      createdby
      header_logo
      fav_icon
      link
      mediahandle
    }
  }
`;

export const FETCH_MEDIA_HANDLE = gql`
  query FETCH_SITE_SETTING($pagePath: String!) {
    authoring_getMediaHandle(pagePath: $pagePath) {
      tagname
      lastmodificationdate
      createdby
      lastmodifiedby
      mediahandle
    }
  }
`;

export const FETCH_COOKIE_POLICY = gql`
  query FETCH_COOKIE_POLICY($pagePath: String!) {
    authoring_getCookiePolicy(pagePath: $pagePath) {
      cookie_policy_cta_link
      lastmodifiedby
      non_essential_cookie_description
      cookie_manage_setting_consent_button
      cookie_button_text
      non_essential_cookie_title
      manage_save_setting_consent_button
      essential_cookie_description
      consent_cookie_button
      manage_setting_description
      consent_cookie_title
      manage_setting_cookie_button
      cookie_description
      lastmodificationdate
      cookie_manage_setting_title
      essential_cookie_title
      consent_cookie_description
      createdby
      cookie_policy_cta_text
      cookie_title
      consent_cookie_policy_link
      informative_cookie_policy_link
      consent_cookie_country_list
      informative_cookie_country_list
      cookie_consent_expiry_time
      cookie_informative_expiry_time
    }
  }
`;

export const FETCH_COUNTRY = gql`
  query FETCH_COUNTRY($start: Int!,$rows: Int!,$searchCategory: String!){
    authoring_getTagsList(
      pagination: { start: $start, rows: $rows }
      searchCategory: $searchCategory
    ) {
      category
      tags
    }
  }
`;

export const FETCH_HEADER_SETTING = gql`
  query FETCH_HEADER_SETTING($page: String!) {
    authoring_getSitedetails(siteConfig:SiteHeaderSettings, page: $page)
}
`;

export const FETCH_GLOBAL_SETTING = gql`
  query FETCH_GLOBAL_SETTING($page: String!) {
    authoring_getSitedetails(siteConfig:SiteBranding,page: $page) 
}
`;

export const FETCH_MULTISITE_LISTING = gql`
  query FETCH_MULTISITE_LISTING(
    $pagination: authoring_Paginate!
    $pageFilter: authoring_PageFilter!
    $sort: authoring_sortOption!
  ) {
    authoring_getMultiSiteListItems(
      pageFilter: $pageFilter
      pagination: $pagination
      sort: $sort
    )
  }
`;

export const FETCH_DOMAIN_LIST = gql`
  query FETCH_DOMAIN_LIST {
    authoring_getAdminDomainList(siteConfig:Domain)
}
`;

export const FETCH_ADMIN_LIST = gql`
  query FETCH_ADMIN_LIST {
    authoring_getAdminDomainList(siteConfig:Admin)
}
`;

export const FETCH_USER_SITE = gql`
  query FETCH_USER_SITE(
    $user_id: String! 
    $content_type: String!
    ) {
    authoring_getUserSitePermissionList(
      user_id: $user_id
      content_type: $content_type
    )
  }
`;
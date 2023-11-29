export type SiteSettingResponse = {
  authoring_getHeaderFooter: SiteSettingData;
};

export type SiteSettingData = {
  about_us_text: String;
  address: String;
  contact_number: String;
  cookie_accept_consent_cookie_button_text: String;
  cookie_manage_setting_cookie_button_text: String;
  cookie_manage_setting_title: String;
  manage_setting_description: String;
  cookie_manage_setting_consent_button_text: String;
  manage_save_setting_consent_button_text: String;
  cookie_policy_cta_text: String;
  cookie_policy_cta_link: String;
  copyright_text: String;
  essential_cookie_description: String;
  essential_cookie_title: String;
  non_essential_cookie_description: String;
  non_essential_cookie_title: String;
  news_letter_description: String;
  site_logo: String;
  title_text: String;
  email_address: String;
  news_letter_title: String;
  facebook_url: String;
  twitter_url: String;
  instagram_url: String;
  linkedin_url: String;
  youtube_url: String;
  copyright_year_description: String;
  cookie_description: String;
  cookie_title: String;
  link: Link[];
};
type Link = {
  link_name: String;
  link_url: String;
};

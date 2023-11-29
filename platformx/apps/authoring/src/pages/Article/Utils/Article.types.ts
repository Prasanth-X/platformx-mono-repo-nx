export type ArticlelistProps = {
  Page?: string;
  ParentPageURL?: string;
  Page_State?: string;
  CurrentPageURL: string;
  Title?: string;
  Description?: string;
  LastModificationDate: string;
  LastModifiedBy?: string;
  PublishedBy?: string;
  Path: string;
};

export type ArticleSeoInfo = {
  showContent: boolean;
  share: boolean;
  structureData: any;
};

export type ArticleSEOProps = {
  selectedArticle: any;
  setSelectedArticle: any;
  getArticle: any;
};

export type SocialShareInfoProps = {
  SeoTitle: string;
  SocialOgTitle: string;
  SocialOgDescription: string;
  SocialOgSiteName: string;
  SocialOgType: string;
  SocialOgURL: string;
  SocialOgImage: string;
  SocialOgTwitterTitle: string;
  SocialOgTwitterDescription: string;
  SocialOgTwitterImage: string;
  SocialOgTwitterURL: string;
  SocialTwitterCardSize: string;
  PageTags: string[];
};

export type DesktoplistProps = {
  article?: any;
  index?: any;
  setSelectedArticle?: any;
  selectedArticleData?: any;
  handleDeleteArticle?: any;
  handlePublishedPageView?: any;
  openArticleSettingsPanel?: any;
  updateListing?: any;
  handleEditArticle?: any;
  getArticleModel?: any;
  unPublishArticle?: any;
  LanguageList?: any;
  language?: any;
  setLanguage?: any;
  getArticle?: any;
};

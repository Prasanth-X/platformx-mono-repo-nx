import { authInfo } from '../../../../utils/authConstants';
import { getSubDomain, handleHtmlTags, trimString } from '../../../../utils/helperFunctions';

export const createVodInstance = (username: string) => {
  const vodInstance = {
    Page: '',
    Title: '',
    Description: '',
    ShortDescription: '',
    AccountId: '',
    PlayerID: '',
    VideoId: '',
    PlayerType: 'brightcove',
    Thumbnail: '',
    DsapceVideoUrl: '',
    Poster: '',
    Author: username,
    Tags: [],
    ParentPageURL: '/',
    CurrentPageURL: '',
    IsEdit: false,
    SeoEnable: true,
    AnalyticsEnable: true,
    RobotTxt: false,
    SiteMap: false,
    Page_State: '',
    Page_CreatedBy: username,
    Page_LastModifiedBy: username,
    Page_PublishedBy: '',
    Analytics: '',
    Others: '',
    StructureData: '',
    PageSettings: {},
    IsConfirm: false,
  };
  return vodInstance;
};

export const updateVodSettings = (vodRef, currentVodData, language) => {
  const pageURLData = vodRef.current.Title.replace(
    /[^A-Z0-9]+/gi,
    '-'
  ).toLowerCase();
  const pageURL = currentVodData.current ? currentVodData.current : pageURLData; //edit and create

  const VodSettings = {
    SocialOgURL: `${getSubDomain()}/${language}/` + `video` + `/${pageURL}`,
    SocialOgTwitterURL:
      `${getSubDomain()}/${language}/` + `video` + `/${pageURL}`,
    SocialOgType: 'video article',
    SocialOgSiteName: vodRef.current?.Title
      ? trimString(handleHtmlTags(vodRef.current?.Title), 100)
      : 'video article',
    SeoTitle: vodRef.current?.Title
      ? trimString(handleHtmlTags(vodRef.current?.Title), 100)
      : '',
    SocialOgTitle: vodRef.current?.Title
      ? trimString(handleHtmlTags(vodRef.current?.Title), 100)
      : '',
    SocialOgTwitterTitle: vodRef.current?.Title
      ? trimString(handleHtmlTags(vodRef.current?.Title), 100)
      : '',
    SocialOgDescription: vodRef.current?.Description
      ? trimString(handleHtmlTags(vodRef.current?.Description), 163)
      : '',
    SocialOgTwitterDescription: vodRef.current?.Description
      ? trimString(handleHtmlTags(vodRef.current?.Description), 163)
      : '',
    SocialOgImage: vodRef.current?.Thumbnail,
    SocialOgTwitterImage: vodRef.current?.Thumbnail,
    PageTags: vodRef.current.Tags,
    SeoKeywords: vodRef.current.Tags,
    SeoDescription: vodRef.current?.Description
      ? trimString(handleHtmlTags(vodRef.current?.Description), 163)
      : '',
  };
  return VodSettings;
};

export const updateStructureData = (vodRef) => {
  const VodStructureData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoObject',
        contentUrl: vodRef.current?.DsapceVideoUrl,
        name: vodRef.current?.Title
          ? trimString(handleHtmlTags(vodRef.current?.Title), 100)
          : '',
        description: vodRef.current?.Description
          ? trimString(handleHtmlTags(vodRef.current?.Description), 200)
          : '',
        embedUrl: vodRef.current?.DsapceVideoUrl,
        thumbnailUrl: {
          '@id': vodRef.current?.Thumbnail,
        },
      },
    ],
  };
  return VodStructureData;
};
export const isInViewport = (element, isSeo) => {
  const mainElement = document.querySelector(`#${element}`);
  if (mainElement) {
    const rect = mainElement.getBoundingClientRect();
    if (isSeo) {
      return (
        rect.top < window.pageYOffset + window.innerHeight &&
        rect.left < window.pageXOffset + window.innerWidth &&
        rect.top + rect.height > window.pageYOffset &&
        rect.left + rect.width > window.pageXOffset
      );
    }
    return rect.top >= 0 && rect.left >= 0;
  }
  return false;
};
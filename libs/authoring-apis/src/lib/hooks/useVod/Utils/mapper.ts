import { VodInstance } from './constants'

export const getSampVod = (username) => {
  const sampVOD: VodInstance = {
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
  }
  return sampVOD
}

export const mapFetchVod = (startIndex: number, state: any, filter: string) => {
  return {
    searchTerm: state?.searchTerm,
    tags: state?.tags,
    dateFilter: {
      from: state?.fromDate,
      to: state?.toDate,
    },
    created_by: state?.author,
    contentType: 'Vod',
    pageFilter: filter,
    sort: 'DESC',
    pagination: { start: startIndex, rows: 20 },
    isSuggestive: false,
  }
}

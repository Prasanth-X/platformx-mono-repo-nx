export const COLORS = ['#6D8F97', '#FFD3B6', '#FFAAA5'];
export const DASHBOARD = 'dashboard';
export const SETTINGS = {
  slidesToShow: 3,
  slidesToScroll: 3,
  infinite: false,
  dots: false,
  arrow: false,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const PAGE_MODEL_INSTANCE = {
  Page: '',
  SiteName: '',
  Title: '',
  ParentPageURL: '/',
  CurrentPageURL: '/',
  DevelopedBy: '',
  DevelopedDate: '',
  IsEdit: false,
  SeoEnable: true,
  AnalyticsEnable: true,
  RobotTxt: false,
  SiteMap: false,
  Children: null,
  Analytics: '',
  Others: '',
  StructureData: '',
  PageSettings: {},
  Page_LastModificationDate: '',
};

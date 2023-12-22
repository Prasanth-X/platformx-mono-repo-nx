import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShowToastSuccess } from '@platformx/utilities';
// Define the initial state for the relevant slice
interface ArticleState {
  newArticle: any;
  previewArticle: any;
  updatedField: {
    articleUrl: string;
    updatedObj: Record<string, any>;
  };
  saveArticle: {
    createmutate: any;
    newArticle: any;
    pageState: string;
    currentPageURL: string;
  };
  initialState: any;
  articleList: any;
  articleSettings: any;
}

const initialArticleState: ArticleState = {
  newArticle: {
    Page: '-10',
    Title: '',
    SubTitle: '',
    Description: '',
    Banner: '',
    ContentType: 'article',
    Category: 'article',
    SiteName: 'PlatX',
    ParentPageURL: '/',
    CurrentPageURL: '-10', // hello-world
    DevelopedBy: '',
    // DevelopedDate: new Date().toISOString(),
    Page_State: 'draft',
    IsEdit: false,
    SeoEnable: true,
    AnalyticsEnable: true,
    RobotTxt: false,
    SiteMap: false,
    Analytics: '',
    Others: '',
    StructureData: '',
    ArticleSettings: {
      // ArticleName: '',
      // IsSchedulePublish: false,
      // IsScheduleUnpublish: false,
      // PageCaching: false,
      // PageMobileFriendly: false
    },
    LinkTags: '',
    creationDate: new Date().toISOString(),
    modificationDate: '',
    articleContent: {
      // Images: {
      //   Image_1: {
      //     Name: '',
      //     Url: 'https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/ab04e728-7d70-4b7e-89f0-51e82857a2c2/content',
      //     Title: 'HomeBanner',
      //     Description: 'This is for HeroBanner',
      //     AltText: 'HomeBanner'
      //   },
      // },
    },
    Tag: ['article'],
    Links: '',
    createdby: '',
    Page_LastModifiedBy: '',
  },

  previewArticle: null,
  updatedField: {
    articleUrl: '-10',
    updatedObj: {},
  },
  saveArticle: {
    createmutate: null,
    newArticle: null,
    pageState: 'draft',
    currentPageURL: '',
  },
  initialState: null,
  articleList: null,
  articleSettings: null,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState: initialArticleState,
  reducers: {
    createArticle: (state, action: PayloadAction<{ article: any }>) => {
      state.newArticle = action.payload.article;
    },
    previewArticle: (state, action: PayloadAction<any>) => {
      state.previewArticle = action.payload.article;
    },
    updateField: (
      state,
      action: PayloadAction<{
        articleUrl: string;
        updatedObj: Record<string, any>;
      }>
    ) => {
      state.updatedField.articleUrl = action.payload.articleUrl;
      state.updatedField.updatedObj = action.payload.updatedObj;
    },
    saveArticle: (
      state,
      action: PayloadAction<{
        createmutate: any;
        newArticle: any;
        pageState: string;
        currentPageURL: string;
      }>
    ) => {
      const { createmutate, newArticle, pageState, currentPageURL } =
        action.payload;
      if (pageState === 'publish') {
        newArticle.Page_State = 'publish';
      }
      createmutate({
        variables: {
          input: newArticle,
        },
      }).then((resp: any) => {
        if (pageState !== 'publish') {
          ShowToastSuccess('Article saved successfully!');
        } else {
          state.updatedField.articleUrl = currentPageURL;
          state.updatedField.updatedObj = { Page_State: 'publish' };
        }
        console.log(resp);
      });
    },
    updateArticleInitialState: (
      state,
      action: PayloadAction<{ payload: any }>
    ) => {
      state.initialState = action.payload;
    },
    updateArticleList: (state, action: PayloadAction<{ payload: any }>) => {
      state.articleList = action.payload;
    },
    updateArticleSettings: (
      state,
      action: PayloadAction<{ articleInfo: any }>
    ) => {
      state.articleSettings = action.payload.articleInfo;
    },
  },
});

// Export the action creators
export const {
  createArticle,
  previewArticle,
  updateField,
  saveArticle,
  updateArticleInitialState,
  updateArticleList,
  updateArticleSettings,
} = articleSlice.actions;

// Export the reducer
export default articleSlice.reducer;

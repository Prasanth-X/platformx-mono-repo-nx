import { createSearchParams } from 'react-router-dom';
import {
  showToastError,
  showToastSuccess,
} from '../components/toastNotification/toastNotificationReactTostify';
import { formatUrl } from '../utils/helperFunctions';

export const updateSaveWarning = (status: boolean) => {
  return {
    type: 'SHOW_SAVE_WARNING',
    status,
  };
};
export const updateImage = (articleId, imageIndex, imageObj) => {
  return {
    type: 'UPDATE_ARTICLE_IMAGE',
    articleId,
    imageIndex,
    imageObj
  };
};
export const createArticle = (username, navigate) => {
  const newArticle = {
    Page: "-10",
    Title: "",
    SubTitle: "",
    Description: "",
    Banner: "",
    ContentType: "article",
    Category: "article",
    SiteName: "PlatX",
    ParentPageURL: "/",
    CurrentPageURL: "-10", //hello-world
    DevelopedBy: username,
    //DevelopedDate: new Date().toISOString(),
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
      // ArticleName: "",
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
      //     Name: "",
      //     Url: "https: //platx-dspace-dev.fanuep.com/server/api/core/bitstreams/ab04e728-7d70-4b7e-89f0-51e82857a2c2/content",
      //     Title: "HomeBanner",
      //     Description: "This is for HeroBanner",
      //     AltText: "HomeBanner"
      //   },
      // },
    },
    Tag: ['article'],
    Links: '',
    createdby: username,
    Page_LastModifiedBy: username,
  };
  return {
    type: 'CREATE_ARTICLE',
    article: newArticle,
  };
};

export const previewArticle = (newArticle) => {
  return {
    type: 'PREVIEW_ARTICLE',
    article: newArticle,
  };
};
export const updateField = (keyToUpdate, newVal, CurrentPageURL = '-10') => {
  let updatedObj = {};
  if (newVal.trim().length > 0) {
    if (keyToUpdate == 'Title') {
      const url = formatUrl(newVal.trim());
      updatedObj = {
        Title: newVal,
        Page: url,
        CurrentPageURL: url
      };
    } else {
      updatedObj[keyToUpdate] = newVal;
    }
    return {
      type: 'UPDATE_ARTICLE',
      articleUrl: CurrentPageURL,
      updatedObj
    };
  } return {
    type: 'NO_ACTION'
  };

};
export const saveArticle = (createmutate, newArticle, pageState = 'draft', currentPageURL = '') => {
  if (pageState == 'publish') {
    newArticle.Page_State = 'publish';
  }
  createmutate({
    variables: {
      input: newArticle,
    },
  })
    .then((resp) => {
      if (pageState != 'publish') {
        showToastSuccess("Article saved successfully!");
      } else {
        updateField('Page_State', 'publish', currentPageURL);
      }
      console.log(resp);
    });
  return {
    type: 'NO_ACTION'
  };
};
// export const publishArticle= () => {
//   return {
//     type: 'UPDATE_PAGESTATE'
//   }
// }
// export const createArticle = (
//   userName,
// ) => {
//   // const newArticle = {
//   //   Page: 'article101',
//   //   Title: 'New Title goes here',
//   //   SubTitle: 'Pen your thoughts here...',//not needed
//   //   Description:' Final content goes here... All set Ready?!',
//   //   id: '101',
//   //   status: 'draft',
//   //   contentType: 'article',
//   //   title: '',
//   //   description: '',
//   //   articleContent: {
//   //       image_1: null,
//   //       video_1: null,
//   //       },
//   //   tags: [''],
//   //   links: [''],
//   //   linkTags: [''],
//   //   creationDate: '12/10/2022',
//   //   modificationDate: '',
//   //   createdby: userName,
//   //   modifiedby: ''
//   // };
//   const newArticle ={
//         Page: "article012",
//         Title: "This is title",
//         SubTitle: "This is Subtitle",
//         Description: "This is Description",
//         Banner: "This is Banner",
//         ContentType: "article",
//         Category: "article",
//         SiteName: "rishabhsri@hcl.com",
//         ParentPageURL: "/",
//         CurrentPageURL: "/article012",
//         DevelopedBy: "Rishabh",
//         DevelopedDate: "2022-10-04T12:47:02.924Z",
//         Page_State: "draft",
//         IsEdit: false,
//         SeoEnable: true,
//         AnalyticsEnable: true,
//         RobotTxt: false,
//         SiteMap: false,
//         Children: null,
//         Analytics: "",
//         Others: "",
//         StructureData: "",
//         ArticleSettings: {
//           ArticleName: "article012",
//           IsSchedulePublish: false,
//           IsScheduleUnpublish: false,
//           PageCaching: false,
//           PageMobileFriendly: false
//         },
//         linkTags: "['Sponsor','Players']",
//         creationDate: "11/12/2021",
//         modificationDate: "15/01/2022",
//         articleContent: {
//           Images: {
//             Image_1: {
//               Name: "HomeBanner",
//               Url: "https: //platx-dspace-dev.fanuep.com/server/api/core/bitstreams/ab04e728-7d70-4b7e-89f0-51e82857a2c2/content",
//               Title: "HomeBanner",
//               Description: "This is for HeroBanner",
//               AltText: "HomeBanner"
//             },
//             Image_2: {
//               Name: "HomeBanner",
//               Url: "https: //platx-dspace-dev.fanuep.com/server/api/core/bitstreams/ab04e728-7d70-4b7e-89f0-51e82857a2c2/content",
//               Title: "HomeBanner",
//               Description: "This is for HeroBanner",
//               AltText: "HomeBanner"
//             },
//           },
//           // "Videos": {
//           //   "Video_1": {
//           //     "Name": "Video message from Leadership",
//           //     "Url": "https: //platx-dspace-dev.fanuep.com/server/api/core/bitstreams/c7f889d8-3838-4227-940f-b8ad85f220fc/content/",
//           //     "Title": "Product Summary Via Video",
//           //     "Description": "This is for Product Summary",
//           //     "Attribution": false,
//           //     "Transcript": false,
//           //     "Thumbnail": "https: //platx-dspace-dev.fanuep.com/server/api/core/bitstreams/110d2ce3-b4f7-4c4d-a86e-402bbfac3b1e/content",
//           //     "CC": false
//           //   }
//           // }
//         },
//         tags: "['tag1','tag2','tag3']",
//         links: "['https://hclx.com', 'https://hclx.com','manutd.com']",
//         createdby: "rishabh",
//         Page_LastModifiedBy: "rishabh",
//       }
//   return {
//     type: 'CREATE_ARTICLE',
//     article: newArticle
//   }
// };
//};
export const updateInitialState = (updatedState: any) => {
  return {
    type: 'UPDATE_INITIAL_STATE',
    payload: updatedState,
  };
};

export const updateArticleList = (articleList: any) => {
  return {
    type: 'UPDATE_ARTICLE_LIST',
    payload: articleList,
  };
};

export const updateArticleSettings = (articleInfo) => {
  return {
    type: 'UPDATE_ARTICLE_SETTINGS',
    articleInfo,
  };
};

export const createPageModel = (
  newPageModel: any,
  mutate: any,
  navigate: any,
  handleImpression: any,
  t
) => {
  mutate({
    variables: { input: newPageModel },
  })
    .then((resp) => {
      showToastSuccess(`${t('page')} ${t('created_toast')}`);
      localStorage.setItem('path', resp?.data?.authoring_createPage?.path);
      const pageDataObj = {
        eventType: 'Successful Page Creation',
        pageCreated: true,
        created_page_title: newPageModel.Page,
        createdby: newPageModel.DevelopedBy,
      };
      handleImpression(pageDataObj.eventType, pageDataObj);
      navigate(
        {
          pathname: '/edit-page',
          search: `?${createSearchParams({
            page: resp?.data?.authoring_createPage?.path.toString(),
          })}`,
        },
        { state: 'new' }
      );
    })
    .catch((error) => {
      showToastError(error.graphQLErrors[0].message);
    });
  return {
    type: 'CREATE_PAGEMODEL',
    pm: newPageModel,
  };
};

interface ImageProps {
  Thumbnail: string;
  Title: string;
  Description: string;
  Author?: string;
  Bundles?: string;
}
interface VideoDetails {
  Name: string;
  Url: string;
  Title: string;
  Description: string;
  Attribution: boolean;
  Transcript: boolean;
  CC: boolean;
}
interface VideoProps {
  Url: string;
  Thumbnail?: string;
  Title: string;
}
interface ArticleInstance {
  Page: string;
  Title: string;
  ParentPageURL: string;
  CurrentPageURL: string;
  Page_State: string;
  Description: string;
  Banner: string;
  Tag: string;
  contentType: string;
  articleContent?: {
    images: ImageProps[] | null;
    videos: ImageProps[] | null;
  };
  Links?: '';
  LinkTags?: string[];
  creationDate?: string;
  modificationDate?: string;
  createdby?: string;
  modifiedby?: string;
  Page_LastModifiedBy?: string;
}

interface InitialStateInstance {
  articleArray: ArticleInstance[] | [];
  currentArticle: ArticleInstance | any;
}

export const articleInitialState: InitialStateInstance = {
  articleArray: [],
  currentArticle: {},
};

const addArticle = (state, newArticle) => {
  const newarticleArray: ArticleInstance[] = [...state.articleArray];
  //const articleid = newarticleArray.length;
  //newArticle.id = '';
  newarticleArray.push(newArticle);
  console.log('Article Array:', newarticleArray);
  return {
    ...state,
    articleArray: newarticleArray,
    currentArticle: newArticle,
  };
};
const previewArticle = (state, newArticle) => {
  const newarticleArray: ArticleInstance[] = [...state.articleArray];
  return {
    ...state,
    articleArray: newarticleArray,
    currentArticle: newArticle,
  };
};
const updateArticle = (state, articleUrl, updatedObj) => {
  const newarticleArray: ArticleInstance[] = [...state.articleArray];
  const articleToModifyIndex = newarticleArray.findIndex(
    (article) => article.CurrentPageURL == articleUrl
  );
  console.log(
    'while modifying:',
    updatedObj,
    ' value of index:',
    articleToModifyIndex
  );
  const modifiedArticle = {
    ...newarticleArray[articleToModifyIndex],
    ...updatedObj,
  };
  newarticleArray[articleToModifyIndex] = modifiedArticle;
  console.log('Article instance modified:', modifiedArticle);
  return {
    ...state || {},
    articleArray: newarticleArray,
    currentArticle: modifiedArticle,
  };
};
const updateInitialState = (state, payload) => {
  return { ...state || {}, articleArray: payload };
};

const updateArticleList = (state, payload) => {
  return {
    ...state || {},
    articleArray: [...state?.articleArray || {}, ...payload || {}],
  };
};
const updateArticleSettings = (state, articleInfo) => {
  return {
    ...state,
    ArticleSettings: { ...state.articleSettings, ...articleInfo },
    showSaveWarning: true,
  };
};
/*const updateArticleImage = (
  state,
  articleId,
  imageIndex,
  imageObj
) => {
  const newarticleArray: ArticleInstance[] = [...state.articleArray];
  const articleToModifyIndex = newarticleArray.findIndex(article=>article.id==articleId);
  const articleToModify = newarticleArray[articleToModifyIndex];
  // articleToModify?.articleContent?.images[imageIndex] = imageObj;
  // newArticle.id = articleid;
  // newarticleArray[articleToModifyIndex]=articleToModify;
  console.log("Article instance modified:",newarticleArray[articleToModifyIndex]);
  return { ...state, articleArray: newarticleArray };
};*/
export const articleReducer = (state, action) => {
  switch (action.type) {
    case 'PREVIEW_ARTICLE':
      return previewArticle(state, action.article);
    case 'CREATE_ARTICLE':
      return addArticle(state, action.article);
    case 'UPDATE_ARTICLE':
      return updateArticle(state, action.articleUrl, action.updatedObj);
    case 'UPDATE_ARTICLE_IMAGE':
      return state; //updateArticleImage(state, action.articleId, action.imageIndex, action.imageObj);
    case 'UPDATE_INITIAL_STATE':
      return updateInitialState(state, action.payload);
    case 'UPDATE_ARTICLE_LIST':
      return updateArticleList(state, action.payload);
    default:
      return state;
    case 'UPDATE_ARTICLE_SETTINGS':
      return updateArticleSettings(state, action.articleInfo);
  }
};
